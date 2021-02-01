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

import { apiAddImage } from '../../../store/modules/attachment/attachment.api';

const imageUpload = async (file) => {
  const fdata = new FormData();
  fdata.append('title', 'editor_upload');
  fdata.append('file', file);
  try {
    const resData = await apiAddImage(fdata);
    if (resData.result.code !== 'RS0000') throw new Error(resData.result.message || 'error');
    return resData;
  } catch (error) {
    throw new Error(error || 'error');
  }
};
const onAddImageBlobHook = async (file) => {
  const resData = await imageUpload(file);
  const returnValue = {
    success: 1,
    file: { url: resData.data.download },
  };
  return new Promise((resolve) => {
    resolve(returnValue);
  });
};

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
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: props.data || '',
      onReady: () => {
        ejInstance.current = editor;
        props.onReadyEditor(editor);
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
          config: {
            endpoint: `${
              process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_API_URL_DEV
                : process.env.REACT_APP_API_URL_PROD
            }/pagemeta`,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: { uploadByFile: onAddImageBlobHook },
          },
        },
        attaches: {
          class: Attaches,
          config: {
            endpoint: `${
              process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_API_URL_DEV
                : process.env.REACT_APP_API_URL_PROD
            }/attachments/file`,
            field: 'file',
          },
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
