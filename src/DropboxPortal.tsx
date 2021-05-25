import { useEffect, useState, FC } from 'react';
import { createPortal } from 'react-dom';
import { IProps } from './types';

// For loading dropbox script
const loadDropbox = (callback: { (): void; (): void; }, appKey: string) => {
  const existingScript = document.getElementById('dropboxjs');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.setAttribute('data-app-key', appKey);
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
}


const DropboxPortal: FC<IProps> = ({zoom = 'fit', view = 'list', headerSize = 'normal', link, id, appKey }: IProps, children) => {
  const mount = document.getElementById(id);
  const [scriptloaded, setScriptloaded] = useState(false);
  const embededId = `${id}Embedded`;
  // our new div to append
  const el = document.createElement('div');
  el.id = embededId;
  el.style.height = '100%';
  el.dataset.link = link;
  const options = {
    // Shared link to Dropbox file
    link,
    file: {
      // Sets the zoom mode for embedded files. Defaults to 'best'.
      zoom, // or "fit"
    },
    folder: {
      // Sets the view mode for embedded folders. Defaults to 'list'.
      view, // or "grid"
      headerSize, // or "small"
    },
  };

  // load our script and reflect that in scriptloaded
  useEffect(() => {
    if ((window as any).Dropbox === undefined) {
      loadDropbox(() => {
        setScriptloaded(true);
      }, appKey);
    } else {
      // script already loaded
      setScriptloaded(true);
    }
  }, []);

  // embed element as soon as we can do so
  useEffect(() => {
    if (scriptloaded && (window as any).Dropbox !== undefined && mount) {
      const embededEl = document.getElementById(embededId);
      // if we haven't append the div, lets append and embed
      if (embededEl === null) {
        mount.appendChild(el);
        (window as any).Dropbox.embed(options, el);
      // otherwise, we only embed again if link changes
      } else if (embededEl.dataset.link !== link) {
        (window as any).Dropbox.embed(options, embededEl);
      }
    }
    // We don't need to remove it
    return undefined;
  }, [embededId, link, el, mount, options, scriptloaded]);

  return createPortal(children, el);
}

export default DropboxPortal;
