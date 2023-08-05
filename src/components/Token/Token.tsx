import { Fragment } from 'react';
import { E_TokenType, T_Token } from '../../app/model/types';

interface I_Props {
  token: T_Token;
}

export default function Token({ token }: I_Props) {
  function handleTipClick(html: string) {
    console.log(html);
  }

  switch (token.type) {
    case E_TokenType.H:
      return <h4 className="cm-token-header">{token.text}</h4>;

    case E_TokenType.S:
      return <h5 className="cm-token-subheader">{token.text}</h5>;

    case E_TokenType.P:
      return (
        <p
          className="cm-token-paragraph"
          dangerouslySetInnerHTML={{ __html: token.html }}
        ></p>
      );

    case E_TokenType.W:
      return (
        <p
          className="alert alert-warning"
          dangerouslySetInnerHTML={{ __html: token.html }}
        ></p>
      );

    case E_TokenType.R:
      return (
        <a
          className="cm-token-resource"
          href={token.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {token.text}
        </a>
      );

    case E_TokenType.U:
      return (
        <ul className="cm-token-unordered-list">
          {token.items.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{ __html: item }}
            ></li>
          ))}
        </ul>
      );

    case E_TokenType.O:
      return (
        <ol className="cm-token-ordered-list">
          {token.items.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{ __html: item }}
            ></li>
          ))}
        </ol>
      );

    case E_TokenType.C:
      const splittedText = token.text.split('\n');

      return (
        <div className="cm-token-code-wrapper">
          <pre className="cm-token-code-tips">
            {splittedText.map((line, idx) => {
              const currentTip = token.tips.find(
                (tip) => tip.line === idx
              );
              if (currentTip) {
                return (
                  <Fragment key={idx}>
                    <button
                      className="cm-token-code-tip"
                      onClick={() => handleTipClick(currentTip.html)}
                    >
                      ?
                    </button>
                    {' \n'}
                  </Fragment>
                );
              } else {
                return '\n';
              }
            })}
          </pre>
          <pre className="cm-token-code-ruler">
            {splittedText.map((line, idx) => `${idx + 1}\n`)}
          </pre>
          <pre className="cm-token-code-text">
            <code
              dangerouslySetInnerHTML={{ __html: token.text }}
            ></code>
          </pre>
        </div>
      );
  }
}
