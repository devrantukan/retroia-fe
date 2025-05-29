import { HTMLAttributes, ElementType } from "react";

interface DynamicContentProps extends HTMLAttributes<HTMLElement> {
  content: string;
  as: ElementType;
}

export default function DynamicContent({
  content,
  as: Component,
  ...props
}: DynamicContentProps) {
  return <Component {...props} dangerouslySetInnerHTML={{ __html: content }} />;
}
