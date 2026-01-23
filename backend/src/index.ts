import app from './server';
import colors from 'colors';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(colors.green.italic(`Servidor corriendo desde: http://localhost:${port}`));
})