import { createInfoChangePayload, INFO_UPDATE_ENDPOINT } from './InfoChange';

describe('createInfoChangePayload', () => {
    test('changed fields only and removes confirmation password', () => {
        const payload = createInfoChangePayload(
            {
                mobile: '01022223333',
                nickname: 'newNick',
                checkPW: 'abc123!@#',
                password: 'abc123!@#',
            },
            {
                mobile: '01011112222',
                nickname: 'oldNick',
            }
        );

        expect(payload).toEqual({
            mobile: '01022223333',
            nickname: 'newNick',
            password: 'abc123!@#',
        });
    });

    test('returns empty payload when nothing changed', () => {
        const payload = createInfoChangePayload(
            {
                mobile: '01011112222',
            },
            {
                mobile: '01011112222',
                nickname: 'oldNick',
            }
        );

        expect(payload).toEqual({});
    });
});

describe('INFO_UPDATE_ENDPOINT', () => {
    test('uses the backend update route for profile changes', () => {
        expect(INFO_UPDATE_ENDPOINT).toBe('info/update');
    });
});
