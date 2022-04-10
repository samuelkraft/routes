import Link from 'next/link'
import { Fragment } from 'react'

export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  return text.map(value => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        className={[
          bold ? 'font-bold ' : '',
          code ? 'font-mono ' : '',
          italic ? 'italic ' : '',
          strikethrough ? 'line-through ' : '',
          underline ? 'underline ' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    )
  })
}

const renderNestedList = block => {
  const { type } = block
  const value = block[type]
  if (!value) return null

  const isNumberedList = value.children[0].type === 'numbered_list_item'

  if (isNumberedList) {
    return <ol>{value.children.map(block => renderBlock(block))}</ol>
  }
  return <ul>{value.children.map(block => renderBlock(block))}</ul>
}

export const renderBlock = block => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p className="mb-2">
          <Text text={value.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1 className="mt-4 mb-3 text-3xl font-semibold">
          <Text text={value.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2 className="mt-4 mb-3 text-2xl font-semibold">
          <Text text={value.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3 className="mt-4 mb-3 text-xl font-semibold">
          <Text text={value.rich_text} />
        </h3>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li className="mb-2">
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <Text text={value.text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map(block => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p className="mb-3">{value.title}</p>
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure className="mb-3">
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return (
        <blockquote className="mb-3" key={id}>
          {value.rich_text[0].plain_text}
        </blockquote>
      )
    case 'code':
      return (
        <pre className="mb-3">
          <code key={id}>{value.rich_text[0].plain_text}</code>
        </pre>
      )
    case 'file':
      const src_file = value.type === 'external' ? value.external.url : value.file.url
      const splitSourceArray = src_file.split('/')
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
      const caption_file = value.caption ? value.caption[0]?.plain_text : ''
      return (
        <figure className="mb-3">
          <div>
            📎{' '}
            <Link href={src_file} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      )
    case 'bookmark':
      const href = value.url
      return (
        <a href={href} target="_brank" className="mb-3">
          {href}
        </a>
      )
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`
  }
}
