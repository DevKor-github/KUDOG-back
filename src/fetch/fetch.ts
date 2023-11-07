import { page, url } from 'src/interfaces/urls';
import { dto } from 'src/interfaces/dto';
import { AnyNode } from 'domhandler';

import { parseDocument, DomUtils } from 'htmlparser2';
import axios from 'axios';

const dateRegex = /\d{4}\.(0[1-9]|1[012])\.(0[1-9]|[12][0-9]|3[01])/;

const fetch = async (link: string) => {
  const response = await axios.get(link);
  const html = response.data as string;
  return html;
};

const isNotice = (element: AnyNode) => {
  const txt = DomUtils.textContent(element);
  return dateRegex.test(txt.replaceAll('-', '.'));
};

const getNoticeInfo = (
  element: AnyNode,
  provider: string,
  categoryId: number,
): dto => {
  if (provider === '경영대학') {
    const tit = DomUtils.getElements(
      {
        class: (type) => type === 'tit',
      },
      element,
      true,
    );
    const title = DomUtils.innerText(tit).trim();
    const innerText = DomUtils.innerText(element)
      .replaceAll('\t', '')
      .replaceAll('\n', '')
      .replaceAll('  ', '');
    const date = innerText.match(dateRegex)[0].replaceAll('.', '-');
    const anchor = DomUtils.getElementsByTagName('a', element)[0];
    const link = anchor.attribs.href;
    const today = new Date().toISOString().substring(0, 10);
    if (date !== today) {
      return null;
    }
    return {
      page: {
        provider: '경영대학',
        categoryId: -1,
        url: `https://biz.korea.ac.kr/news/${link}&key=&keyfield=&cate=&page=1`,
      },
      writtenDate: date,
      title,
      content: 'tbd',
      writer: '경영대학',
    };
  }
  if (provider === '전기전자공학부') {
    const tit = DomUtils.getElements(
      {
        class: (type) => type === 'tit',
      },
      element,
      true,
    );
    const title = DomUtils.innerText(tit).trim();
    const innerText = DomUtils.innerText(element)
      .replaceAll('\t', '')
      .replaceAll('\n', '')
      .replaceAll('  ', '');
    const date = innerText.match(dateRegex)[0].replaceAll('.', '-');
    const anchor = DomUtils.getElementsByTagName('a', element)[0];
    const link = anchor.attribs.href;
    const today = new Date().toISOString().substring(0, 10);
    if (date !== today) {
      return null;
    }
    return {
      page: {
        provider: '전기전자공학부',
        categoryId: -1,
        url: `https://ee.korea.ac.kr/community/${link}`,
      },
      writtenDate: date,
      title,
      content: 'tbd',
      writer: '전기전자공학부',
    };
  }

  if (provider === '심리학부') {
    const tit = DomUtils.getElements(
      {
        class: (type) =>
          type === 'fw500 fs22__tit txt-elp__multi data-card-info__tit',
      },
      element,
      true,
    );
    const title = DomUtils.innerText(tit).trim();
    const innerText = DomUtils.innerText(element)
      .replaceAll('\t', '')
      .replaceAll('\n', '')
      .replaceAll('  ', '');
    const date = innerText.match(dateRegex)[0].replaceAll('.', '-');
    const anchor = DomUtils.getElementsByTagName('a', element)[0];
    const link = `https://psy.korea.ac.kr${anchor.attribs.href}`;

    const today = new Date().toISOString().substring(0, 10);
    if (date !== today) {
      return null;
    }
    return {
      page: {
        provider: '심리학부',
        categoryId: -1,
        url: link,
      },
      writtenDate: date,
      title,
      content: 'tbd',
      writer: '심리학부',
    };
  }
  let anchoridx = 0;
  if (categoryId === 58) anchoridx = 1;
  const anchor = DomUtils.getElementsByTagName('a', element)[anchoridx];
  const link = anchor.attribs.href;
  const title = DomUtils.innerText(anchor).trim();
  const innerText = DomUtils.innerText(element)
    .replaceAll('\t', '')
    .replaceAll('\n', '')
    .replaceAll('  ', '');
  const date = innerText
    .replaceAll('-', '.')
    .match(dateRegex)[0]
    .replaceAll('.', '-');
  const today = new Date().toISOString().substring(0, 10);
  if (date !== today) {
    return null;
  }
  const substr = innerText
    .replace(title, '')
    .replace('News', '')
    .replace('Events', '');
  let author = '';
  if (provider === '의과대학') author = '의과대학';
  else if (provider === '건축사회환경공학과') author = '건축사회환경공학과';
  // eslint-disable-next-line prefer-destructuring
  else author = substr.match(/[가-힣a-zA-Z]+/)[0];
  return {
    page: {
      provider: 'tbd',
      categoryId: -1,
      url: link,
    },
    writtenDate: date,
    title,
    content: 'tbd',
    writer: author,
  };
};

const parseRows = (html: string, provider: string, categoryId: number) => {
  const dom = parseDocument(html);
  let elements = DomUtils.getElements(
    {
      tag_name: (type) => type === 'tr' || type === 'li',
    },
    dom,
    true,
  );
  if (provider === '경영대학') {
    // get elements which is class=notice
    elements = DomUtils.getElements(
      {
        class: (type) => type === 'cont',
      },
      dom,
      true,
    );
  }
  if (provider === '전기전자공학부') {
    // get elements which is class=notice
    elements = DomUtils.getElements(
      {
        class: (type) => type === 'cont',
      },
      dom,
      true,
    );
  }
  if (provider === '심리학부') {
    elements = DomUtils.getElements(
      {
        class: (type) => type === 'em',
      },
      dom,
      true,
    );

    const result: dto[] = [];
    const articleNos = [];
    const elementCallback = (element: AnyNode) => {
      if (isNotice(element)) {
        const info = getNoticeInfo(element, provider, categoryId);
        if (info === null) return;
        if (articleNos.includes(info.page.url)) return;
        articleNos.push(info.page.url);
        result.push(info);
      }
    };
    elements.forEach(elementCallback);
    return result;
  }
  const result: dto[] = [];
  const articleNos = [];
  const elementCallback = (element: AnyNode) => {
    if (isNotice(element)) {
      const info = getNoticeInfo(element, provider, categoryId);
      if (info === null) return;
      let articleNoStarts =
        info.page.url.indexOf('articleNo=') + 'articleNo='.length;
      if (articleNoStarts === -1)
        articleNoStarts =
          info.page.url.indexOf('articleId=') + 'articleId='.length;
      if (articleNoStarts === -1)
        articleNoStarts = info.page.url.indexOf('no=') + 'no='.length;
      const articleNoEnds = info.page.url.indexOf('&', articleNoStarts);
      const articleNo = info.page.url.substring(articleNoStarts, articleNoEnds);
      if (
        articleNos.includes(articleNo) &&
        provider !== '의과대학' &&
        provider !== '화학과' &&
        provider !== '화공생명공학과' &&
        provider !== '건축사회환경공학과'
      )
        return;
      articleNos.push(articleNo);
      result.push(info);
    }
  };
  elements.forEach(elementCallback);
  return result;
};

const getLink = (anchor: url, infoLink: url): string => {
  if (anchor.startsWith('http')) return anchor;
  return infoLink.concat(anchor);
};

const getContent = async (link: url): Promise<string> => {
  if (link.includes('biz')) {
    const html = await fetch(link);
    const start = html.indexOf('<div class="title_info">');
    const end = html.indexOf('<div class="list_info">');
    let content = html.substring(start, end);

    const imgStart = content.indexOf('<img alt="" src="');

    if (imgStart !== -1) {
      const imgEnd = content.substring(imgStart + 17).indexOf('"');
      const imgSrc = content.substring(imgStart + 17, imgStart + 17 + imgEnd);
      content = content.replace(
        imgSrc,
        'https://biz.korea.ac.kr'.concat(imgSrc),
      );
    }

    return `<div>${content}</div>`;
  }
  if (link.includes('ee')) {
    const html = await fetch(link);
    const start = html.indexOf('<div class="title_info">');
    const end = html.indexOf('<div class="list_info">');
    let content = html.substring(start, end);

    const imgStart = content.indexOf('<img alt="" src="');

    if (imgStart !== -1) {
      const imgEnd = content.substring(imgStart + 17).indexOf('"');
      const imgSrc = content.substring(imgStart + 17, imgStart + 17 + imgEnd);
      content = content.replace(
        imgSrc,
        'https://ee.korea.ac.kr'.concat(imgSrc),
      );
    }

    return `<div>${content}</div>`;
  }
  if (link.includes('psy')) {
    const html = await fetch(link);
    const start = html.indexOf('<div class="data-view-hd">');
    const end = html.indexOf('<div class="paging-btn-wrap">');
    const content = html.substring(start, end);

    return `<div>${content}</div>`;
  }

  const html = await fetch(link);
  let startidx = html.lastIndexOf('<article');
  let endidx = -1;
  if (startidx === -1) {
    startidx = html.lastIndexOf('<table');
    endidx = html.lastIndexOf('</table>') + '</table>'.length;
  } else {
    endidx =
      html.substring(startidx).indexOf('</article>') +
      startidx +
      '</article>'.length;
  }
  let article = html.substring(startidx, endidx);

  article = article.replaceAll(
    `href="?`,
    `href="${link.substring(0, link.indexOf('?'))}?`,
  );

  const imgStart = article.indexOf('<img src="');

  if (imgStart !== -1) {
    const imgEnd = article.substring(imgStart + 10).indexOf('"');
    const imgSrc = article.substring(imgStart + 10, imgStart + 10 + imgEnd);
    const domain = link.substring(0, link.replace('//', '11').indexOf('/'));
    const src = getLink(imgSrc, domain);
    article = article.replace(imgSrc, src);
  }
  const captionStart = article.indexOf('<caption>');
  const captionEnd = article.indexOf('</caption>');
  if (captionStart !== -1 && captionEnd !== -1) {
    return article
      .substring(0, captionStart)
      .concat(article.substring(captionEnd + 10));
  }
  return article;
};

const noticeFetcher = async (pageInfo: page): Promise<dto[]> => {
  const dtos: dto[] = [];

  const html = await fetch(pageInfo.url);
  const result = parseRows(html, pageInfo.provider, pageInfo.categoryId);
  const contentAugmentedResult = await Promise.all(
    result.map(async (element) => {
      if (
        pageInfo.provider === '보건과학대학' &&
        (element.page.url.includes('exin') ||
          element.page.url.includes('healthsci'))
      )
        return;
      console.log(`fetched: ${element.title} from ${pageInfo.provider}`);
      return {
        page: {
          provider: pageInfo.provider,
          categoryId: pageInfo.categoryId,
          url: getLink(element.page.url, pageInfo.url),
        },
        writtenDate: element.writtenDate,
        title: element.title,
        content: await getContent(getLink(element.page.url, pageInfo.url)),
        writer: element.writer,
      };
    }),
  );
  dtos.push(...contentAugmentedResult);

  return dtos;
};

export default noticeFetcher;
