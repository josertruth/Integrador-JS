const cardsData = [
    {
        id: 1,
        name: "Mountain I",
        price: 50,
        category: "mountain",
        cardImg: "/public/img/tree1.png",
        info: "These trees like the cold climate, which is why many Christmas tree farms are located in mountain regions. Many of the trees and shrubs in mountain areas are evergreen.",
    },
    {
        id: 2,
        name: "Mountain II",
        price: 49,
        category: "mountain",
        cardImg: "/public/img/tree1.png",
        info: "These trees like the cold climate, which is why many Christmas tree farms are located in mountain regions. Many of the trees and shrubs in mountain areas are evergreen.",
    },
    {
        id: 3,
        name: "Mountain III",
        price: 48,
        category: "mountain",
        cardImg: "/public/img/tree1.png",
        info: "These trees like the cold climate, which is why many Christmas tree farms are located in mountain regions. Many of the trees and shrubs in mountain areas are evergreen.",
    },
    {
        id: 4,
        name: "River",
        price: 54,
        category: "river",
        cardImg: "/public/img/tree2.png",
        info: "River trees are a type of trees that grow along riverbanks or other bodies of water. These trees have adapted to the unique conditions found in riparian zones.",
    },
    {
        id: 5,
        name: "River",
        price: 50,
        category: "river",
        cardImg: "/public/img/tree2.png",
        info: "River trees are a type of trees that grow along riverbanks or other bodies of water. These trees have adapted to the unique conditions found in riparian zones.",
    },
    {
        id: 6,
        name: "River III",
        price: 104,
        category: "river",
        cardImg: "/public/img/tree2.png",
        info: "River trees are a type of trees that grow along riverbanks or other bodies of water. These trees have adapted to the unique conditions found in riparian zones.",
    },
    {
        id: 7,
        name: "Forest",
        price: 64,
        category: "forest",
        cardImg: "/public/img/tree3.webp",
        info: "Forest trees are woody plants that grow tall and have a single main stem or trunk with branches and leaves extending from it. They live for several years.",
    },
    {
        id: 8,
        name: "Forest II",
        price: 74,
        category: "forest",
        cardImg: "/public/img/tree3.webp",
        info: "Forest trees are woody plants that grow tall and have a single main stem or trunk with branches and leaves extending from it. They live for several years.",
    },
    {
        id: 9,
        name: "Forest III",
        price: 56,
        category: "forest",
        cardImg: "/public/img/tree3.webp",
        info: "Forest trees are woody plants that grow tall and have a single main stem or trunk with branches and leaves extending from it. They live for several years.",
    },
];

const splitCards = (size) => {
    let dividedCards = [];

    for (let i = 0; i < cardsData.length; i += size) {
        dividedCards.push(cardsData.slice(i, i + size));
    }
    return dividedCards;
};

const cardsController = {
    dividedCards: splitCards(3),
    nextCardsIndex: 1,
    cardsLimit: splitCards(3).length,
};
