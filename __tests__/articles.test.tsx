import { render, screen } from '@testing-library/react';
import ArticlesPage from '@/app/articles/page';
import '@testing-library/jest-dom'
import { useSession } from "next-auth/react";
import ArticleCard from '@/components/profile/ArticleCard';
import { Roles } from '@prisma/client';
jest.mock("next-auth/react");

global.fetch = ( 
  jest.fn(
    () => Promise.resolve({ json: () => Promise.resolve({ articles: [] }), 
    ok: true,
  },
), 
) as jest.Mock );

test('renders articles page with no articles, show two label "no article"', () => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: 'Toto',
      email: 'toto@toto.toto',
      role: Roles.USER,
    },
  };
  (useSession as jest.Mock).mockReturnValue({data: mockSession, status: 'authenticated'});

  render(<ArticlesPage />);

  const noArticleLabels = screen.getAllByText('Aucun article dans cette catégorie');
  
  expect(noArticleLabels.length).toBe(2);
});

test('renders article card', () => {

  const mockedArticle = {
    id: '1',
    authorId: '1',
    body: "article's body",
    title: "article's title",
    updatedAt: new Date(),
    createdAt: new Date(),
    author: {
      image: "image",
      name: "author's name",
    }
  };

  render(<ArticleCard id={mockedArticle.id} title={mockedArticle.title} body={mockedArticle.body} date={mockedArticle.createdAt} author={mockedArticle.author}/>);

  const articleBody = screen.getByText(mockedArticle.body);
  const articleTitle = screen.getByText(mockedArticle.title);
  
  expect(articleBody).toBeInTheDocument();
  expect(articleTitle).toBeInTheDocument();
});

test('renders articles page with admin account, show write article button', () => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: 'Toto',
      email: 'toto@toto.toto',
      role: Roles.AMDIN,
    },
  };
  (useSession as jest.Mock).mockReturnValue({data: mockSession, status: 'authenticated'});

  render(<ArticlesPage />);

  const writeArticleButton = screen.getByText('Ecrire un article');
  
  expect(writeArticleButton).toBeInTheDocument();
});

test('renders articles page with user account, doesn\'t show write article button', () => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      name: 'Toto',
      email: 'toto@toto.toto',
      role: Roles.USER,
    },
  };
  (useSession as jest.Mock).mockReturnValue({data: mockSession, status: 'authenticated'});

  render(<ArticlesPage />);

  const writeArticleButton = screen.queryByText('Ecrire un article');
  
  expect(writeArticleButton).not.toBeInTheDocument();
});