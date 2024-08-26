import { render, screen } from '@testing-library/react';
import ArticlesPage from '@/app/articles/page';
import { useSession } from "next-auth/react";
jest.mock("next-auth/react");

test('renders articles page with no articles', () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" }
    };
    (useSession as jest.Mock).mockReturnValueOnce([mockSession, 'authenticated']);

    // global.fetch = jest.fn(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve({ articles: [] }),
    //   }),
    // ) as jest.Mock;

    jest.spyOn(global, "fetch").mockImplementation( 
      jest.fn(
        () => Promise.resolve({ json: () => Promise.resolve({ articles: [] }), 
        ok: true,
      },
    ), 
    ) as jest.Mock ) 

    render(<ArticlesPage />);

    const noArticleLabels = screen.getAllByText('Aucun article dans cette catégorie');
    
    expect(noArticleLabels.length).toBe(2);
  });