import React from "react";
import { cn } from "./utils";

// Base components
const Head = React.forwardRef<HTMLDivElement, React.ComponentProps<"h2">>(
  ({ children }) => (
    <h2 className="mb-2 mt-6 rounded bg-gray-800 p-1 px-2 text-sm uppercase text-white">
      {children}
    </h2>
  ),
);
Head.displayName = "Head";

const SubHead = React.forwardRef<HTMLDivElement, React.ComponentProps<"h3">>(
  ({ children }) => (
    <h3 className="mb-2 rounded bg-gray-200 px-2 text-black">{children}</h3>
  ),
);
SubHead.displayName = "SubHead";

const Box = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    inactive?: boolean;
  }
>(({ children, className = "", inactive = false }) => (
  <div
    className={cn(
      "flex h-4 w-20 items-center justify-center rounded p-1 text-xs text-white",
      inactive ? "bg-gray-300" : "bg-gray-400",
      className,
    )}
  >
    {children}
  </div>
));
Box.displayName = "Box";

const FlexExample = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    description?: string;
    heading: string;
    isDefault?: boolean;
  }
>(({ description, heading, isDefault, children, className }) => (
  <div className="mb-2 flex flex-col text-sm">
    <div
      className={cn("font-mono text-xs", isDefault ? "font-bold" : "font-bold")}
    >
      {heading}
    </div>
    <div className="flex gap-1">
      <div
        className={cn(
          className,
          "min-h-8 w-52 overflow-x-hidden rounded border border-gray-400 bg-gray-100 p-0.5",
        )}
      >
        {children}
      </div>
      {isDefault && <div className="text-xl text-gray-400">D</div>}
    </div>
    {description && <div className="w-52 text-gray-400">{description}</div>}
  </div>
));
FlexExample.displayName = "FlexExample";

// Section Components
const DisplaySection = () => (
  <>
    <Head>Display</Head>
    <FlexExample
      heading="flex"
      description="block-level flex container"
      isDefault={true}
    >
      <div className="flex gap-1">
        <Box className="w-full">FLEX</Box>
      </div>
    </FlexExample>

    <FlexExample
      description="inline flex container, flows with text"
      heading="inline-flex"
      className="!min-h-0"
    >
      <div className="px-2">
        Lorem ipsum dolor sit amet, consecutor
        <span className="inline-flex gap-2 px-2">
          <Box className="h-4 w-12">FLEX</Box>
        </span>
        amet.
      </div>
    </FlexExample>
  </>
);

const FlowDirectionSection = () => (
  <>
    <Head>Flow Direction</Head>
    <div className="mb-2 text-sm">
      <code>flex-[...]</code> defines the main axis (= flow direction) and cross
      axis (= perpendicular to flow direction).
    </div>

    <FlexExample heading="flex-row" isDefault={true}>
      <div className="flex flex-row gap-1">
        <Box>A</Box>
        <Box>B</Box>
      </div>
    </FlexExample>

    <FlexExample heading="flex-row-reverse">
      <div className="flex flex-row-reverse gap-1">
        <Box>A</Box>
        <Box>B</Box>
      </div>
    </FlexExample>

    <FlexExample heading="flex-col">
      <div className="flex h-12 flex-col gap-1">
        <Box>A</Box>
        <Box>B</Box>
      </div>
    </FlexExample>

    <FlexExample heading="flex-col-reverse">
      <div className="flex h-12 flex-col-reverse gap-1">
        <Box>A</Box>
        <Box>B</Box>
      </div>
    </FlexExample>
  </>
);

const OthersSection = () => (
  <>
    <Head>Others</Head>
    <FlexExample heading="order-first" description="moves before all items">
      <div className="flex gap-1">
        <Box inactive>A</Box>
        <Box className="order-first">B</Box>
        <Box inactive>C</Box>
      </div>
    </FlexExample>

    <FlexExample heading="order-last" description="moves after all items">
      <div className="flex gap-1">
        <Box className="order-last">A</Box>
        <Box inactive>B</Box>
        <Box inactive>C</Box>
      </div>
    </FlexExample>

    <FlexExample
      heading="order-[...]"
      description="moves to specific position [...], default 0"
    >
      <div className="flex gap-1">
        <Box inactive>A</Box>
        <Box className="order-1">B</Box>
        <Box inactive>C</Box>
      </div>
    </FlexExample>
  </>
);

const ItemSizingSection = () => (
  <>
    <Head>Item Sizing</Head>
    <FlexExample heading="grow-0" description="does not expand" isDefault>
      <div className="flex gap-1">
        <Box className="grow-0">grow-0</Box>
        <Box inactive />
      </div>
    </FlexExample>

    <FlexExample heading="grow" description="expands to fill space">
      <div className="flex gap-1">
        <Box className="grow">grow</Box>
        <Box inactive />
      </div>
    </FlexExample>

    <FlexExample heading="shrink-0" description="does not shrink">
      <div className="flex gap-1">
        <Box className="shrink-0">shrink-0</Box>
        <Box inactive />
        <Box inactive />
      </div>
    </FlexExample>

    <FlexExample heading="shrink" description="shrinks to fit space" isDefault>
      <div className="flex gap-1">
        <Box className="shrink-1">shrink</Box>
        <Box inactive />
        <Box inactive />
      </div>
    </FlexExample>

    <FlexExample
      heading="basis-auto"
      description="starts at content size"
      isDefault
    >
      <div className="flex gap-1">
        <Box className="basis-auto">auto</Box>
        <Box inactive />
        <Box inactive />
      </div>
    </FlexExample>

    <FlexExample heading="basis-0" description="starts at zero size">
      <div className="flex gap-1">
        <Box className="basis-0">0</Box>
        <Box inactive />
        <Box inactive />
      </div>
    </FlexExample>
  </>
);
const WrappingSection = () => (
  <>
    <Head>Wrapping</Head>
    <FlexExample heading="flex-no-wrap" isDefault>
      <div className="flex-no-wrap flex gap-1">
        {["A", "B", "C"].map((n) => (
          <Box key={n} className="shrink-0">
            {n}
          </Box>
        ))}
      </div>
    </FlexExample>

    <FlexExample heading="flex-wrap">
      <div className="flex flex-wrap gap-1">
        {["A", "B", "C"].map((n) => (
          <Box key={n}>{n}</Box>
        ))}
      </div>
    </FlexExample>

    <FlexExample heading="flex-wrap-reverse">
      <div className="flex flex-wrap-reverse gap-1">
        {["A", "B", "C"].map((n) => (
          <Box key={n}>{n}</Box>
        ))}
      </div>
    </FlexExample>
  </>
);

const JustifyContentSection = () => (
  <>
    <Head>Justify Content</Head>
    <div className="mb-2 text-sm">
      <code>justify-[...]</code> aligns the items along the{" "}
      <span className="font-bold">axis</span> of the flex.
    </div>

    <FlexExample heading="justify-start" isDefault>
      <div className="flex justify-start gap-1">
        <Box className="w-8" />
        <Box className="w-8" />
        <Box className="w-8" />
      </div>
    </FlexExample>

    <FlexExample heading="justify-center">
      <div className="flex justify-center gap-1">
        <Box className="w-8" />
        <Box className="w-8" />
        <Box className="w-8" />
      </div>
    </FlexExample>
    <FlexExample heading="justify-end">
      <div className="flex justify-end gap-1">
        <Box className="w-8" />
        <Box className="w-8" />
        <Box className="w-8" />
      </div>
    </FlexExample>
    <FlexExample
      heading="justify-between"
      description="equal spaces between items"
    >
      <div className="flex justify-between">
        <Box className="w-8" />
        <Box className="w-8" />
        <Box className="w-8" />
      </div>
    </FlexExample>
    <FlexExample
      heading="justify-around"
      description="equal spaces around items (doubles gaps between)"
    >
      <div className="flex justify-around">
        <Box className="w-8" />
        <Box className="w-8" />
        <Box className="w-8" />
      </div>
    </FlexExample>
    <FlexExample
      heading="justify-evenly"
      description="all spaces are identical"
    >
      <div className="flex justify-evenly">
        <Box className="w-8" />
        <Box className="w-8" />
        <Box className="w-8" />
      </div>
    </FlexExample>
  </>
);

const AlignItemsSection = () => (
  <>
    <Head>Align Items</Head>
    <div className="mb-2 text-sm">
      <code>items-[...]</code> aligns{" "}
      <span className="font-bold">each item</span> along the{" "}
      <span className="font-bold">cross axis</span> of the flex.
    </div>

    <FlexExample heading="items-start" isDefault>
      <div className="flex h-full items-start gap-1">
        <Box />
        <Box className="h-10" />
        <Box className="h-6" />
      </div>
    </FlexExample>

    <FlexExample heading="items-center">
      <div className="flex h-full items-center gap-1">
        <Box />
        <Box className="h-10" />
        <Box className="h-6" />
      </div>
    </FlexExample>

    <FlexExample heading="items-end">
      <div className="flex h-full items-end gap-1">
        <Box />
        <Box className="h-10" />
        <Box className="h-6" />
      </div>
    </FlexExample>

    <FlexExample
      heading="items-stretch"
      description="fills cross axis (requires h-auto/w-auto on children)"
    >
      <div className="flex h-10 items-stretch gap-1">
        <Box className="h-auto" />
        <Box className="h-auto" />
        <Box className="h-auto" />
      </div>
    </FlexExample>

    <FlexExample heading="items-baseline">
      <div className="flex h-full items-baseline gap-1">
        <Box className="pb-3" />
        <Box className="h-10 pb-3" />
        <Box className="h-6 pb-3" />
      </div>
    </FlexExample>
  </>
);
const AlignSelfSection = () => (
  <>
    <Head>Align Self</Head>
    <div className="mb-2 text-sm">
      <code>self-[...]</code> aligns{" "}
      <span className="font-bold">a single item</span> along the{" "}
      <span className="font-bold">cross axis</span> of the flex.
    </div>

    <FlexExample heading="self-auto" description="follows the parent" isDefault>
      <div className="flex h-full gap-1">
        <Box className="h-8 self-auto">auto</Box>
        <Box className="h-10" inactive />
        <Box className="h-6" inactive />
      </div>
    </FlexExample>

    <FlexExample heading="self-start">
      <div className="flex h-full gap-1">
        <Box className="h-8 self-start">start</Box>
        <Box className="h-10" inactive />
        <Box className="h-6" inactive />
      </div>
    </FlexExample>

    <FlexExample heading="self-center">
      <div className="flex h-full gap-1">
        <Box className="h-8 self-center">center</Box>
        <Box className="h-10" inactive />
        <Box className="h-6" inactive />
      </div>
    </FlexExample>

    <FlexExample heading="self-end">
      <div className="flex h-full gap-1">
        <Box className="h-8 self-end">end</Box>
        <Box className="h-10" inactive />
        <Box className="h-6" inactive />
      </div>
    </FlexExample>

    <FlexExample heading="self-stretch">
      <div className="flex h-12 gap-1">
        <Box className="h-auto self-stretch">stretch</Box>
        <Box className="h-10" inactive />
        <Box className="h-6" inactive />
      </div>
    </FlexExample>

    <FlexExample
      heading="self-baseline"
      description="(this needs multiple items to work)"
    >
      <div className="flex h-full gap-1">
        <Box className="h-8 self-baseline pb-3">baseline</Box>
        <Box className="h-10 self-baseline pb-3" />
        <Box className="h-6" inactive />
      </div>
    </FlexExample>
  </>
);

const AlignContentSection = () => (
  <>
    <Head>Align Content</Head>
    <div className="mb-2 text-sm">
      <code>content-[...]</code> aligns all items of a row/column together along
      the <span className="font-bold">cross axis</span> of the flex.
    </div>

    <FlexExample heading="content-stretch" isDefault>
      <div className="flex h-14 flex-wrap content-stretch gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>

    <FlexExample heading="content-start">
      <div className="flex h-14 flex-wrap content-start gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>

    <FlexExample heading="content-center">
      <div className="flex h-14 flex-wrap content-center gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>

    <FlexExample heading="content-end">
      <div className="flex h-14 flex-wrap content-end gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>

    <FlexExample
      heading="content-between"
      description="equal spaces between lines"
    >
      <div className="flex h-14 flex-wrap content-between gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>

    <FlexExample
      heading="content-around"
      description="equal spaces around lines (doubles gaps between)"
    >
      <div className="flex h-14 flex-wrap content-around gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>

    <FlexExample
      heading="content-evenly"
      description="all spaces are identical"
    >
      <div className="flex h-14 flex-wrap content-evenly gap-1">
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
        <Box className="h-4 grow" />
      </div>
    </FlexExample>
  </>
);

const ShorthandsSection = () => (
  <div className="mt-4 text-sm">
    <Head>Shorthands</Head>
    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-6">
      <FlexExample
        heading="flex-initial"
        description="can shrink, won't grow (grow-0 shrink-1 basis-auto)"
        isDefault
      >
        <div className="flex gap-1">
          <Box className="flex-initial">initial</Box>
          <Box inactive />
          <Box inactive />
        </div>
      </FlexExample>

      <FlexExample
        heading="flex-1"
        description="equal size, ignores content (grow-1 shrink-1 basis-0)"
      >
        <div className="flex flex-1 gap-1">
          <Box className="flex-1">flex-1</Box>
          <Box className="flex-1">flex-1</Box>
          <Box inactive />
        </div>
      </FlexExample>

      <FlexExample
        heading="flex-auto"
        description="equal size, respects content (grow-1 shrink-1 basis-auto)"
      >
        <div className="flex gap-1">
          <Box className="flex-auto">auto</Box>
          <Box className="flex-auto">auto</Box>
          <Box inactive />
        </div>
      </FlexExample>

      <FlexExample
        heading="flex-none"
        description="fixed size (grow-0 shrink-0 basis-auto)"
      >
        <div className="flex gap-1">
          <Box className="flex-none">none</Box>
          <Box inactive />
          <Box inactive />
        </div>
      </FlexExample>
    </div>
  </div>
);

function TailwindCheatSheet() {
  return (
    <div className="w-full p-2">
      <h1 className="mb-2 text-center text-xl font-bold">
        Tailwind CSS Flexbox Cheat Sheet
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div>
          <DisplaySection />
          <FlowDirectionSection />
          <WrappingSection />
        </div>
        <div>
          <ItemSizingSection />
          <OthersSection />
        </div>
        <div>
          <JustifyContentSection />
        </div>
        <div>
          <AlignItemsSection />
        </div>
        <div>
          <AlignSelfSection />
        </div>
        <div>
          <AlignContentSection />
        </div>
      </div>
      <ShorthandsSection />
    </div>
  );
}

export default TailwindCheatSheet;
