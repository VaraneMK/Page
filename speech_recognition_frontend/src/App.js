import './App.css';
import { BrowserRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLogin } from './redux/reducers/userSlice';
import PageContainer from './components/PageContainer/PageContainer';
import { getAuthStatus } from './redux/reducers/adminSlice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLogin());
		dispatch(getAuthStatus());
	}, [dispatch]);

	return (
		<div className="App">
			<BrowserRouter>
				<PageContainer />
			</BrowserRouter>
		</div>
	);
}

export default App;
