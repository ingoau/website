export type PortableTextSpan = {
  _key?: string;
  _type: "span";
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: string;
  style?: string;
  children?: PortableTextSpan[];
};

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <>
      {value.map((block, index) => {
        if (block._type !== "block") {
          return null;
        }

        const children = block.children?.map((child, childIndex) => (
          <span key={child._key ?? childIndex}>{child.text}</span>
        ));
        const key = block._key ?? index;

        switch (block.style) {
          case "h1":
            return <h1 key={key}>{children}</h1>;
          case "h2":
            return <h2 key={key}>{children}</h2>;
          case "h3":
            return <h3 key={key}>{children}</h3>;
          case "h4":
            return <h4 key={key}>{children}</h4>;
          case "blockquote":
            return <blockquote key={key}>{children}</blockquote>;
          default:
            return <p key={key}>{children}</p>;
        }
      })}
    </>
  );
}
