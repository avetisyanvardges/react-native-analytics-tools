import branch from 'react-native-branch';

let branchConfig = null;
const initBranch = (config) => {
    branchConfig = config;
    if(branchConfig && branchConfig.enabled) {
        branch.subscribe({
            onOpenStart: ({uri, cachedInitialEvent}) => {
                console.log('branch open', uri, cachedInitialEvent)
            },
            onOpenComplete: ({error, params, uri}) => {
                console.log('branch compete', uri, params, error)
            },
        })
    }
}

export default {
    initBranch,
};
