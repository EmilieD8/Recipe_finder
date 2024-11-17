"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'Test endpoint working!' });
});
app.use('/api/recipes', recipeRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server. Please try again later.' });
});
exports.default = app;
