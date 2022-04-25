import { useCallback, useEffect } from 'react'
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectGists, selectGistsError, selectGistsLoading } from '../store/gists/selectors';
import { getAllGists } from '../store/gists/actions';

const Gists = () => {

    const dispatch = useDispatch();
    const gists = useSelector(selectGists)
    const loading = useSelector(selectGistsLoading)
    const error = useSelector(selectGistsError)


    const requestGists =
        async () => {
            dispatch(getAllGists())
        }


    useEffect(
        () => {
            requestGists()
        }, []
    )

    const renderGists = useCallback((gist) => <li key={gist.id}>{gist.description} || 'No description'</li>, [])

    if (loading) {
        return (<div className='gistWrap'>
            <CircularProgress></CircularProgress>
        </div>

        )
    }

    if (error) {
        return (
            <div className='gistWrap'>
                <h3>Error</h3>
                <button onClick={requestGists} className='errBtn'>Повторить</button>
            </div>
        )
    }

    return (
        <div className='gistWrap'>
            <ul>
                {gists.map(renderGists)}
            </ul>
        </div>
    )
}

export default Gists