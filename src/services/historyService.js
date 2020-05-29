import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function forwardTo(location) {
    history.push(location);
}

const historyService = {
    forwardTo,
    history,
};

export default historyService;
