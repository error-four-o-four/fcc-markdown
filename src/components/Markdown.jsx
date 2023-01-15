import { createElement, useEffect, useState, lazy } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { createStarryNight, common } from '@wooorm/starry-night';
import { toH } from 'hast-to-hyperscript';

let starryNight;
let languages;

async function fetchStarryNight(resolve) {
  starryNight = await createStarryNight(common);
  languages = starryNight.scopes().map((item) => {
    const [, ...tags] = item.split('.');
    return tags.join('.');
  });
  resolve();
}

function CodeBlock({ className, children }) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : null;

  if (language && languages?.includes(language)) {
    const tree = starryNight.highlight(...children, `source.${language}`);
    return toH(createElement, tree);
  }

  return <code className={className}>{children}</code>;
}

export default function Markdown({ content }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchStarryNight(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <>Loading ...</>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock,
      }}>
      {content}
    </ReactMarkdown>
  );
}
