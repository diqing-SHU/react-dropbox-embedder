import * as React from 'react'
import DropboxPortal from './DropboxPortal'

const Package: FC = (id:string, fileLink:string) => (
  <>
    <div id={id} />
    <DropboxPortal id={id} link={fileLink} />
  </>
)

export default Package
