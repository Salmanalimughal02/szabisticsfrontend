
export const simpleTreeviewData = {
    name: "root",
    children: [
        {
            name: "Applications",
            children: [
                { name: "Ecommerce" },
                { name: "Users" },
                { name: "Chat" }
            ]
        },
        {
            name: "Components",
            children: [
                { name: "UI-Kits" },
                { name: "Bonus-UI" },
                { name: "Charts" }
            ]
        },
        {
            name: "Miscellaneous",
            children: [
                { name: "Gallery" },
                { name: "Blog" },
                { name: "Editors" }
            ]
        },
    ]
}

export const disableTreeData = {
    name: "",
    children: [
        {
            name: "Fruits",
            children: [
                { name: "Avocados" },
                { name: "Bananas" },
                { name: "Berries" },
                { name: "Oranges" },
                { name: "Pears" },
            ],
        },
        {
            name: "Drinks",
            children: [
                { name: "Apple Juice" },
                { name: "Chocolate" },
                { name: "Coffee" },
                {
                    name: "Tea",
                    children: [
                        { name: "Black Tea" },
                        { name: "Green Tea" },
                        { name: "Red Tea" },
                        { name: "Matcha" },
                    ],
                },
            ],
        },
        {
            name: "Vegetables",
            children: [
                { name: "Beets" },
                { name: "Carrots" },
                { name: "Celery" },
                { name: "Lettuce" },
                { name: "Onions" },
            ],
        },
    ],
}