/// <reference path="index.d.ts" />

import React, { createContext, useContext } from 'react';
import ReactDOMServer from 'react-dom/server';

import pages, { Page } from './pages';
import PageComponent from './Page';

type EnvironmentVariables = {
  NODE_ENV: string,
  BASE_URL: string,
  CHROME_EXTENSION_URL: string | undefined,
  REPOSITORY_URL: string | undefined,
};

// default value will never be used
const EnvironmentContext = createContext<EnvironmentVariables>(undefined as any);
const EnvironmentProvider = EnvironmentContext.Provider;
export const useEnvironment = (env: keyof EnvironmentVariables) => useContext(EnvironmentContext)[env];

const PageContext = createContext<Page>(undefined as any);
const PageProvider = PageContext.Provider;
export const usePage = () => useContext(PageContext);

const doctype = '<!DOCTYPE html>';

export default function render(locals: any) {
  return pages.reduce((obj, page) => ({
    ...obj,
    [page.path]: doctype + ReactDOMServer.renderToStaticMarkup(
      <EnvironmentProvider value={locals}>
        <PageProvider value={page}>
          <PageComponent {...page} />
        </PageProvider>
      </EnvironmentProvider>
    ),
  }), {});
};