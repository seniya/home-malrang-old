import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Underline from '@editorjs/underline';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import InlineCode from '@editorjs/inline-code';
import Link from '@editorjs/link';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Attaches from './editorjsAttaches';
import CodeBox from './editorjsCodeBox';
// import Attaches from '@editorjs/attaches';
// import InlineImage from 'editorjs-inline-image';

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = (props) => {
  const ejInstance = useRef();

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      readOnly: true,
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: props.editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      tools: {
        header: Header,
        list: List,
        underline: Underline,
        checklist: Checklist,
        delimiter: Delimiter,
        embed: Embed,
        inlineCode: InlineCode,
        marker: Marker,
        quote: Quote,
        table: Table,
        warning: Warning,
        linkTool: {
          class: Link,
        },
        image: {
          class: ImageTool,
        },
        attaches: {
          class: Attaches,
        },
        codeBox: {
          class: CodeBox,
          config: {
            themeURL:
              'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
            themeName: 'atom-one-dark', // Optional
            useDefaultTheme: 'light', // Optional. This also determines the background color of the language select drop-down
          },
        },
      },
    });
  };

  return (
    <>
      <div id={EDITTOR_HOLDER_ID}> </div>
    </>
  );
};

export default Editor;
