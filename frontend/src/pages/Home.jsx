import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import BlankPage from '../components/BlankPage';



const Home = () => {
    // const [fullScreen, setFullScreen] = useState(null);

    // const handleFullScreenClick = (Component) => {
    //     setFullScreen(Component);
    // };

    // const handleExitFullScreen = () => {
    //     setFullScreen(null);
    // }

    // if( fullScreen === 'TextEditor'){
    //     return (
    //         <div className = "fixed inset-0 bg-grey z-50">
    //             <button 
    //                 onClick = {handleExitFullScreen}
    //                 className = "absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
    //             >
    //                 Exit Full Screen
    //             </button>
    //             <TextEditor />    
    //         </div>
    //     );
    // }

    // if (fullScreen === 'CodeEditor') {
    //     return (
    //         <div className="fixed inset-0 bg-white z-50">
    //             <button
    //                 onClick={handleExitFullScreen}
    //                 className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
    //             >
    //                 Exit Full Screen
    //             </button>
    //             <CodeEditor />
    //         </div>
    //     );
    // }

    const navigate = useNavigate();

    const navToTextEditor = () => {
        navigate('/text-editor');
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">EditIt - Your own text and code editor</h1>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Document Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/text-editor">
                        <BlankPage    content = " Blank Text Doc "/>
                    </Link>
                    <Link to="/code-editor">
                        <BlankPage  content = " Blank Code Editor "/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;