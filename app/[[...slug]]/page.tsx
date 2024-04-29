import React from "react";
import { getAppPageFromSlug, getAppPagePaths } from "@livechat/developer-sdk";
import { Hero } from "../../components/Hero";
import { Stats } from "../../components/Stats";
import {
  AppWidgetProvider,
  AppWidgetProviderKey,
} from "@livechat/developer-ui-react";
import { notFound } from "next/navigation";

const componentMap = {
  hero: Hero,
  stats: Stats,
};

export function getStaticPaths() {
  const paths = ["/", ...getAppPagePaths()];

  return { paths, fallback: false };
}

interface Section {
  type: keyof typeof componentMap;
  // Add other properties as needed
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <></>;
  }

  const page = getAppPageFromSlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <AppWidgetProvider
      widgetKey={`${page.product}/${page.widget}` as AppWidgetProviderKey}
    >
      {page.sections?.length ? (
        (page.sections as Section[]).map((section, index) => {
          const Component = componentMap[section.type];

          if (!Component) {
            return <>Not found</>;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return <Component {...(section as any)} key={index} />;
        })
      ) : (
        <></>
      )}
    </AppWidgetProvider>
  );
}
