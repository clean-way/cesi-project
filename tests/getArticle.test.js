import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date('2024-06-27'))
});

afterAll(() => {
jest.useRealTimers()
});

beforeEach(() => {
    fetch.resetMocks();
});

it("Get Article", async () => {
// Pour que les dates fonctionnent, sinon elles ne sont pas égales
const spy = jest.spyOn(global, 'Date');

const expectedResult = { 
    id: 1,
    title: "Title",
    body: "Body",
    authorId: "authorId",
    createdAt: spy.mock.instances[0],
    updatedAt: spy.mock.instances[0], 
};

fetch.mockResponseOnce(JSON.stringify(expectedResult));

const article = await (await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/article/${expectedResult.id}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })).json();

expect(article).toEqual(expectedResult);
expect(fetch).toHaveBeenCalledTimes(1);
});