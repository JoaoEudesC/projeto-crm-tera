module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    plugins: ["eslint-plugin-import-helpers", "prettier"],
    rules: {
        camelcase: "off",
        "import/no-unresolved": "error",
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
        "no-shadow": "off",
        "no-console": "off",
        "no-useless-constructor": "off",
        "no-empty-function": "off",
        "lines-between-class-members": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
            },
        ],
        "import-helpers/order-imports": [
            "warn",
            {
                newlinesBetween: "always",
                groups: [
                    "module",
                    "/^@shared/",
                    ["parent", "sibling", "index"],
                ],
                alphabetize: { order: "asc", ignoreCase: true },
            },
        ],
        "import/no-extraneous-dependencies": [
            "error",
            { devDependencies: ["**/*.spec.js"] },
        ],
        "prettier/prettier": "error",
    },
    settings: {
        "import/resolver": {
            node: {
                paths: ["src"],
                extensions: [".js"],
            },
        },
    },
};
