import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';
import packageJson from './package.json';

export default {
    input: 'src/main.tsx',
    output: {
        dir: packageJson.libDir,
        format: 'esm',
    },
    external: ['tslib'],
    preserveModules: true,
    plugins: [
        peerDepsExternal(),
        nodeResolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        sass({
            insert: true,
        }),
    ],
};
