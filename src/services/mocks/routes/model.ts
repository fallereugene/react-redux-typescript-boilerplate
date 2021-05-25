import { Response as MResponse } from 'miragejs';

export default (context: any) => {
    context.get(`http://jsonplaceholder.typicode.com/posts`, (schema: any) => {
        return new MResponse(
            200,
            {
                Location: '/login',
            },
            schema.db.list,
        );
    });
};
