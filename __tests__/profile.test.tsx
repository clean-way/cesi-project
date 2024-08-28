import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useSession } from "next-auth/react";
import { Roles } from '@prisma/client';
import { UserWithArticles } from '@/app/profile/[id]/page';
import ProfilePageContent from '@/app/profile/[id]/ProfilePageContent';
jest.mock("next-auth/react");

const mockedUser = {
    id: '1',
    name: 'Toto TOTO',
    email: 'toto@toto.toto',
    image: 'image',
    createdAt: new Date(),
    role: Roles.AMDIN,
    articles: [{
        id: '1',
        authorId: '1',
        body: "article's body",
        title: "article's title",
        updatedAt: new Date(),
        createdAt: new Date(),
    }],
} as UserWithArticles;

global.fetch = ( 
    jest.fn(
        () => Promise.resolve({ json: () => Promise.resolve({ user: mockedUser }), 
        ok: true,
    },
    ), 
) as jest.Mock );

test('renders profile page', () => {
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: mockedUser,
    };
    (useSession as jest.Mock).mockReturnValue({data: mockSession, status: 'authenticated'});

    render(<ProfilePageContent user={mockedUser}/>);

    const nameLabel = screen.getAllByText('Toto TOTO');
    const adminLabel = screen.getAllByText('ADMIN');


    expect(nameLabel.length).toBeGreaterThan(0);
    expect(adminLabel.length).toBeGreaterThan(0);
});

