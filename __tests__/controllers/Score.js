import { list, create, getScoreLimit } from 'src/controllers/Score';
import { syncAndMigrateDBForTests } from 'src/utils/migrateDB';

describe('Score controller', () => {
    let mockRequest = null;
    let mockResponse = null
    let nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {
            query: {}
        };
        mockResponse = {
            status: jest.fn(() => mockResponse),
            send: jest.fn()
        };
        return syncAndMigrateDBForTests();
    });

    describe('create', () => {
        it('should be call "send" function with object send as params', async () => {
            const scoreToSave = {
                pseudo: 'MICHEL',
                player_1: 25,
                player_2: 12,
            }
            mockRequest.body = scoreToSave;
            await create(mockRequest, mockResponse, nextFunction);
            expect(mockResponse.send).toBeCalledWith(expect.objectContaining({
                data: expect.objectContaining(scoreToSave),
                success: true
            }));
        });

        it('should be call "next" function with error if there is an error', async () => {
            // Provocation d'une erreur
            await create(null, null, nextFunction);
            expect(nextFunction).toBeCalledWith(expect.any(Error));
        });
    });

    describe('list', () => {
        it('should be call "send" function with object with data as array', async () => {
            await list(mockRequest, mockResponse, nextFunction);
            expect(mockResponse.send).toBeCalledWith(expect.objectContaining({
                data: expect.arrayContaining([
                    expect.any(Object)
                ])
            }));
        });

        it('should be change number of score if change limit query param', async () => {
            expect(getScoreLimit(null)).toBe(15);
            expect(getScoreLimit(2)).toBe(2);
            expect(getScoreLimit(-1)).toBe(15);
            expect(getScoreLimit(150)).toBe(150);
            expect(getScoreLimit(0)).toBeNull();
        });

        it('should be call "next" function with error if there is an error', async () => {
            // Provocation d'une erreur
            await list(null, null, nextFunction);
            expect(nextFunction).toBeCalledWith(expect.any(Error));
        });
    });
});