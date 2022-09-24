import { useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Quote from '@editorjs/quote'
import ImageTool from '@editorjs/image'
import styled from 'styled-components'

const Input = styled.div`
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    cursor: text;

    .codex-editor__redactor {
        padding-bottom: 150px !important;
    }
`

let editor

const Editor = ({ id, value, onChange = () => {}, defaultValue }) => {
    useEffect(() => {
        editor = new EditorJS({
            holder: id,
            onChange: (api) => {
                api.saver
                    .save()
                    .then((data) => {
                        const editorString = JSON.stringify(data)
                        onChange(editorString)
                    })
                    .catch((err) => console.error(err))
            },
            data: value ? JSON.parse(value) : {},
            tools: {
                header: Header,
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: '/api/fetch-url'
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true
                },
                embed: {
                    class: Embed,
                    inlineToolbar: true,
                    config: {
                        services: {
                            youtube: true,
                            instagram: {
                                // eslint-disable-next-line no-useless-escape
                                regex: /https?:\/\/www\.instagram\.com\/p\/([^\/\?\&]+)\/?/,
                                embedUrl: 'https://www.instagram.com/p/<%= remote_id %>/embed',
                                html:
                                    '<iframe width="400" height="505" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
                                height: 505,
                                width: 400
                            },
                            twitter: {
                                regex: /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/,
                                embedUrl:
                                    'https://twitframe.com/show?url=https://twitter.com/<%= remote_id %>',
                                html:
                                    '<iframe width="600" height="600" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
                                height: 300,
                                width: 600,
                                id: (ids) => ids.join('/status/')
                            }
                        }
                    }
                },
                quote: Quote,
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: '/api/upload',
                            byUrl: '/uploads'
                        },
                        field: 'file'
                    }
                }
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (defaultValue) {
            editor.isReady
                .then(() => {
                    editor.blocks.render(JSON.parse(defaultValue))
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [defaultValue])

    return <Input id={id} />
}

export default Editor
