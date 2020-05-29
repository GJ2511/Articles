const path = require('path');

module.exports = {
    '*.js': (absolutePaths) => {
        const cwd = process.cwd();
        const relativePaths = absolutePaths.map((file) => path.relative(cwd, file)).join(' ');

        return [
            `eslint --fix --max-warnings=0 ${relativePaths}`,
            `prettier --write ${relativePaths}`,
            // `git add ${absolutePaths.join(' ')}`,
            // `npm run test -- --bail --findRelatedTests ${relativePaths}`,
        ];
    },
};
