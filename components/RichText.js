import {
  isComponent,
  isLinkedItem,
  RichTextElement,
} from "@kontent-ai/react-components";
import { Element as DomHandlerElement } from "domhandler";
import Sponsor from "./Sponsor";

const RichText = ({ content }) => {
  return (
    <RichTextElement
      richTextElement={content}
      resolvers={{
        resolveLinkedItem: (linkedItem, { domElement, domToReact }) => {
          if (isComponent(domElement)) {
            switch (linkedItem) {
              case "sponsor":
                return <Sponsor sponsor={linkedItem} />;
              default:
                return (
                  <>
                    <h1>Component</h1>
                    <pre>{JSON.stringify(linkedItem, undefined, 2)}</pre>;
                  </>
                );
            }
          }
          if (isLinkedItem(domElement)) {
            switch (linkedItem.system.type) {
              case "sponsor":
                return <Sponsor sponsor={linkedItem} />;
              default:
                return (
                  <>
                    <h1>Component</h1>
                    <pre>{JSON.stringify(linkedItem, undefined, 2)}</pre>;
                  </>
                );
            }
          }
          throw new Error("Unknown type of the linked item's dom node");
        },
        // resolveImage: (image, { domElement, domToReact }) (
        //     <img
        //         src={image.url}
        //         alt={image.description ? image.description : image.imageId}
        //         width="200"
        //     />
        // ),
        // resolveLink: (link, { domElement, domToReact })(
        //     <a href={`/${link.type}/${link.urlSlug}`}>
        //         {domToReact(domElement.children)}
        //     </a>
        // ),
        resolveDomNode: ({ domNode, domToReact }) => {
          if (
            domNode instanceof DomHandlerElement &&
            domNode.name === "table"
          ) {
            return <div className="table-wrapper">{domToReact([domNode])}</div>;
          }
        },
      }}
    />
  );
};

export default RichText;
