"use client";

import { Check, Share, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { NICE_EASE } from "@/lib/constants";

const iconAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { ease: NICE_EASE },
};

export default function ShareButton({ className }: { className?: string }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        className={className}
        onClick={() => {
          setTimeout(() => {
            setSuccess(false);
            setError(false);
          }, 2000);
          if (!navigator.canShare || !navigator.share) {
            if (!navigator.clipboard) {
              setError(true);
              toast.error("Failed to share");
              return;
            }
            navigator.clipboard.writeText(location.href).then(() => {
              setSuccess(true);
              toast.success("Copied to clipboard");
            });
          } else {
            navigator
              .share({
                url: location.href,
              })
              .then(() => {
                setSuccess(true);
              })
              .catch((error) => {
                if (error == "AbortError: Share canceled") return;
                setError(true);
                toast.error("Failed to share");
              });
          }
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {success ? (
            <motion.div key="success" {...iconAnimation}>
              <Check />
            </motion.div>
          ) : error ? (
            <motion.div key="error" {...iconAnimation}>
              <TriangleAlert className="text-red-400" />
            </motion.div>
          ) : (
            <motion.div key="share" {...iconAnimation}>
              <Share />
            </motion.div>
          )}
        </AnimatePresence>
        Share
      </Button>
    </div>
  );
}
