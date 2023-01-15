import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from 'react';

import { LAYOUT, LayoutContext } from '../context/LayoutContext.jsx';
import { TabsContext } from '../context/TabsContext.jsx';

import initialTextareaContent from '../assets/initialTextareaContent.js';

const LazyMarkdown = lazy(() => import('./Markdown.jsx'));

function Tabs({ children }) {
  const layoutState = useContext(LayoutContext);
  const tabsState = useContext(TabsContext);

  if (layoutState === LAYOUT.SPLIT) {
    return (
      <>
        {children.map((item) => {
          return <div key={item.props.id}>{item}</div>;
        })}
      </>
    );
  }

  const child = children.find((item) => item.props.id === tabsState);
  return <div>{child}</div>;
}

export default function Main() {
  const [markdown, setMarkdown] = useState(initialTextareaContent);

  const layoutState = useContext(LayoutContext);

  const textareaRef = useRef();
  const [lineHeight, setLineHeight] = useState(0);
  const [textareaCols, setTextareaCols] = useState(0);
  const [textareaMinHeight, setTextareaMinHeight] = useState('0px');

  const getTextareaValues = useCallback(
    (string) => {
      const cols = string.split(/\r\n|\r|\n/).length;
      return [cols, `${lineHeight * cols + lineHeight}px`];
    },
    [lineHeight]
  );

  const handleTextarea = (e) => {
    const [cols, height] = getTextareaValues(e.target.value);

    setTextareaCols(cols);
    setTextareaMinHeight(height);
    setMarkdown(e.target.value);
  };

  useEffect(() => {
    const computed = window
      .getComputedStyle(textareaRef.current)
      .getPropertyValue('line-height');
    setLineHeight(parseInt(computed, 10));

    const [cols, height] = getTextareaValues(textareaRef.current.value);

    setTextareaCols(cols);
    setTextareaMinHeight(height);
  }, [getTextareaValues]);

  return (
    <main className={layoutState}>
      <Tabs>
        <textarea
          id="editor"
          ref={textareaRef}
          cols={textareaCols}
          wrap="soft"
          style={{ minHeight: textareaMinHeight }}
          defaultValue={markdown}
          onChange={handleTextarea}
        />
        <div id="preview" className="markdown-body">
          <Suspense fallback={<div>Loading ... </div>}>
            <LazyMarkdown content={markdown} />
          </Suspense>
        </div>
      </Tabs>
    </main>
  );
}
