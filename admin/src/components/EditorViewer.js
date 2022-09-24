import styled from 'styled-components'

const View = styled.div`
    .image-container {
        margin-bottom: 15px;

        img {
            width: 100%;
        }

        .caption {
            font-size: 12px;
            font-style: italic;
            margin-top: 10px;
        }
    }

    .header {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;

        @media (max-width: 500px) {
            font-size: 18px;
        }
    }

    .link-container {
        margin-bottom: 15px;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);

        .meta-title {
            margin-bottom: 5px;
        }

        .meta-description {
            margin-bottom: 5px;
        }

        .link {
        }
    }

    .list-container {
        margin-bottom: 15px;
    }

    .quote-container {
        margin-bottom: 15px;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);

        .quote-text {
        }

        .quote-caption {
            font-size: 12px;
            font-style: italic;
            margin-top: 5px;
        }
    }

    .embed-container {
        margin-bottom: 15px;

        .iframe-container {
            display: flex;

            .embed-iframe {
                border: none;
                outline: none;
            }
        }

        .embed-caption {
            font-size: 12px;
            font-style: italic;
            margin-top: 10px;
        }
    }
`

const EditorViewer = ({ data = {} }) => {
    const blocks = data.blocks

    if (!blocks) return null

    return (
        <View>
            {blocks.map((item, index) => {
                if (item.type === 'image') {
                    return (
                        <div key={index} className="image-container">
                            <img src={item.data.file.url} alt={item.data.file.url} />
                            {item.data.caption && (
                                <div className="caption">{item.data.caption}</div>
                            )}
                        </div>
                    )
                }
                if (item.type === 'header') {
                    return (
                        <div key={index} className="header">
                            {item.data.text}
                        </div>
                    )
                }
                if (item.type === 'paragraph') {
                    return <p key={index} dangerouslySetInnerHTML={{ __html: item.data.text }} />
                }
                if (item.type === 'linkTool') {
                    return (
                        <div key={index} className="link-container">
                            {item.data.meta && item.data.meta.title && (
                                <div className="meta-title">{item.data.meta.title}</div>
                            )}
                            {item.data.meta && item.data.meta.description && (
                                <div className="meta-description">{item.data.meta.description}</div>
                            )}
                            <a
                                href={
                                    item.data.link.substring(0, 6) === 'http://' ||
                                    item.data.link.substring(0, 7) === 'https://'
                                        ? item.data.link
                                        : `http://${item.data.link}`
                                }
                                target="_blank"
                                rel="noreferrer noopener"
                                className="link"
                            >
                                {item.data.link}
                            </a>
                        </div>
                    )
                }
                if (item.type === 'list') {
                    if (item.data.style === 'ordered') {
                        return (
                            <ol key={index} type="1" className="list-container">
                                {item.data.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ol>
                        )
                    }
                    return (
                        <ul key={index} className="list-container">
                            {item.data.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )
                }
                if (item.type === 'quote') {
                    return (
                        <div key={index} className="quote-container">
                            <div className="quote-text">{item.data.text}</div>
                            {item.data.caption && (
                                <div className="quote-caption">{item.data.caption}</div>
                            )}
                        </div>
                    )
                }
                if (item.type === 'embed') {
                    return <Embed item={item} key={index} />
                }
                return null
            })}
        </View>
    )
}

const Embed = ({ item }) => {
    return (
        <div
            className="embed-container"
            style={
                item.data.service === 'twitter'
                    ? {
                          backgroundColor: 'whitesmoke',
                          paddingTop: 5
                      }
                    : undefined
            }
        >
            <div className="iframe-container">
                <iframe
                    src={item.data.embed}
                    title={'embed'}
                    className="embed-iframe"
                    style={{ width: item.data.width, height: item.data.height }}
                />
            </div>
            {item.data.caption && <div className="embed-caption">{item.data.caption}</div>}
        </div>
    )
}

export default EditorViewer
