import * as Lint from 'tslint'
import * as ts from 'typescript'

export type Foo = {
  a: number,
}

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = {
    open: 'Opening curly brace appears on the same line as controlling statement.',
    body: 'Statement inside of curly braces should be on next line.',
    close: 'Closing curly brace should be on the same line as opening curly ' +
    'brace or on the line after the previous block.',
  }

  public apply(sourceFile: ts.SourceFile): Array<Lint.RuleFailure> {
    const walker = new BraceStyleWalker(sourceFile, this.getOptions())

    return this.applyWithWalker(walker)
  }
}

class BraceStyleWalker extends Lint.RuleWalker {
  private allowSingleLine: boolean = false
  private srcText: string

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options)

    this.srcText = sourceFile.getFullText()

    this.allowSingleLine = this.getOptions()[1] && this.getOptions()[1].allowSingleLine
  }

  /* tslint:disable:cyclomatic-complexity */
  protected visitBlock(block: ts.Block): void {
    super.visitBlock(block)

    const parent = block.parent as ts.Node
    const { kind: parentKind } = parent

    if (this.allowSingleLine &&
      getStartPosition(block).line === getEndPosition(block).line)
    {
      return
    }

    const isFunction =
      parentKind === ts.SyntaxKind.Constructor ||
      parentKind === ts.SyntaxKind.MethodDeclaration ||
      parentKind === ts.SyntaxKind.FunctionExpression ||
      parentKind === ts.SyntaxKind.FunctionDeclaration

    if (parentKind === ts.SyntaxKind.ArrowFunction ||
      parentKind === ts.SyntaxKind.ElseKeyword)
      return

    if (isFunction && parametersAreOnSameLine(block))
      return

    const blockChildren = block.getChildren()

    const openingCurlyBrace =
      blockChildren.filter((ch) => ch.kind === ts.SyntaxKind.OpenBraceToken).shift()

    const closingCurlyBrace =
      blockChildren.filter((ch) => ch.kind === ts.SyntaxKind.CloseBraceToken).pop()

    const syntaxList =
      blockChildren.filter((ch) => ch.kind === ts.SyntaxKind.SyntaxList).shift()

    const blockPreviousNode =
      parent.getChildren()[parent.getChildren().indexOf(block) - 1]

    if (!openingCurlyBrace || !closingCurlyBrace || !syntaxList || !blockPreviousNode)
      return

    if (parentKind === ts.SyntaxKind.IfStatement) {
      const children = parent.getChildren()

      const previousNode = children[children.indexOf(block) - 1]

      if (previousNode.kind === ts.SyntaxKind.ElseKeyword)
        return

      const openingParenthese =
        children.filter((ch) => ch.kind === ts.SyntaxKind.OpenParenToken).shift()

      const closingParenthese =
        children.filter((ch) => ch.kind === ts.SyntaxKind.CloseParenToken).shift()

      if (!openingParenthese || !closingParenthese)
        return

      const parenthesesSameLine = areOnSameLine(openingParenthese, closingParenthese)

      if (parenthesesSameLine && areOnSameLine(closingParenthese, openingCurlyBrace))
        return
    }

    if (parentKind === ts.SyntaxKind.WhileStatement) {
      const children = parent.getChildren()

      const openingParenthese =
        children.filter((ch) => ch.kind === ts.SyntaxKind.OpenParenToken).shift()

      const closingParenthese =
        children.filter((ch) => ch.kind === ts.SyntaxKind.CloseParenToken).shift()

      if (!openingParenthese || !closingParenthese)
        return

      const parenthesesSameLine = areOnSameLine(openingParenthese, closingParenthese)

      if (parenthesesSameLine && areOnSameLine(closingParenthese, openingCurlyBrace))
        return
    }

    const openingBracketError = areOnSameLine(blockPreviousNode, block)

    if (openingBracketError) {
      const nextNode = blockChildren[blockChildren.indexOf(openingCurlyBrace) + 1]
      const indent = this.getNodeIndent(nextNode)

      this.addFailure(this.createFailure(
        openingCurlyBrace.getStart(),
        openingCurlyBrace.getWidth(),
        Rule.FAILURE_STRING.open,
        this.createFix(Lint.Replacement.replaceFromTo(
          openingCurlyBrace.pos,
          openingCurlyBrace.pos + 1,
          `\n` + makeIndentation(indent),
        )),
      ))
    }

    if (syntaxList.getChildCount() > 0) {
      const bodyError = areOnSameLine(openingCurlyBrace, syntaxList)
      if (bodyError) {
        this.addFailure(this.createFailure(
          syntaxList.getStart(), syntaxList.getWidth(), Rule.FAILURE_STRING.body))
      }

      const nodeBeforeClosingBracket = syntaxList.getChildren()[syntaxList.getChildren().length - 1]
      const closingBracketError = areOnSameLine(nodeBeforeClosingBracket, closingCurlyBrace)
      if (closingBracketError) {
        this.addFailure(this.createFailure(
          closingCurlyBrace.getStart(), closingCurlyBrace.getWidth(), Rule.FAILURE_STRING.close))
      }
    }
  }

  private getNodeIndent(node: ts.Node): number {
    if (node === this.getSourceFile()) {
      return 0
    }

    if (node.kind === ts.SyntaxKind.SyntaxList) {
      return this.getNodeIndent(node.parent as ts.Node)
    }

    const endIndex = node.getStart()
    let pos = endIndex - 1

    while (pos > 0 && this.srcText.charAt(pos) !== '\n') {
      pos -= 1
    }

    const str = this.getSourceSubstr(pos + 1, endIndex)
    const whiteSpace = (str.match(/^\s+/) || [ '' ])[0]
    const indentChars = whiteSpace.split('')
    const spaces = indentChars.filter((char) => char === ' ').length

    return spaces
  }

  private getSourceSubstr(start: number, end: number) {
    return this.srcText.substr(start, end - start)
  }
}

function makeIndentation(num: number): string {
  let str = ''

  for (let i = 0; i < num - 2; ++i)
    str += ' '

  return str
}

function areOnSameLine(node: ts.Node, nextNode: ts.Node): boolean {
  return getEndPosition(node).line === getStartPosition(nextNode).line
}

function getStartPosition(node: ts.Node) {
  return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart())
}

function getEndPosition(node: ts.Node) {
  return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd())
}

function parametersAreOnSameLine(
  block: ts.Block): boolean
{
  const parent = block.parent as ts.FunctionDeclaration
  const lastParameter = parent.parameters[parent.parameters.length - 1]

  if (!lastParameter || areOnSameLine(lastParameter, parent))
    return true

  return false
}
