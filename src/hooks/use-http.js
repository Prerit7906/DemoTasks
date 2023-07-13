import { useState,useCallback} from "react";
const useHttp=()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchTasks = useCallback(async (gotObject,fetchData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          gotObject.url,{
            method:gotObject.method? gotObject.method:'GET',
            body:gotObject.body ? JSON.stringify(gotObject.body):null,
            headers:gotObject.headers ? gotObject.headers:{}
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
  
        fetchData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },[]);
  
  
    
    return [
      isLoading,
      error,
      fetchTasks
    ]
}
export default useHttp;