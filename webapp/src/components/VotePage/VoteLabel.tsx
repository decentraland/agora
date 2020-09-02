import * as React from 'react'
import * as ReactMarkdown from 'react-markdown'
import './VoteLabel.css'

export default function VoteLabel(value?: string) {
  return (_: string, props: Record<string, string>) => {
    return (
      <label className="VoteLabel" {...props}>
        <ReactMarkdown
          source={value || ''}
          allowedTypes={['paragraph', 'link']}
          renderers={{ link: 'span' }}
        />
      </label>
    )
  }
}
