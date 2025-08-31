import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import fiiConfig from '@federation-interservices-d-informatique/fiibot-common/eslint.config.mjs'; 

export default tseslint.config(
    ...fiiConfig,
    globalIgnores(["dist/**", "**/node_modules/*"]),
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname
            }
        },
    }
);