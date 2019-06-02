export class FeedModel {
    title: string;
    url: string;
    item: FeedItemModel[];
}

export class FeedItemModel {
    title: string;
    description: string;
    img: string;
    url: string;
    date: string;
    anteTitle: string;
    category: string;
    text: string;
    author: AuthorModel;
}

export class AuthorModel {
    name: string;
    avatar: string;
}