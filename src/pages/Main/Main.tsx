import React, {useCallback, useEffect, useMemo} from 'react';

import {DefaultPage} from '..';
import {AddTask} from '../../components/AddTask';
import {CompletedItems} from '../../components/CompletedItems';
import {ListItems} from '../../components/ListItems';
import {Today} from '../../components/Today';
import {PageLayout} from '../../components/layouts/PageLayout';
import {IGeneralChildren} from '../../Interfaces/IGeneralComponent';
import {Spinner} from '../Sprinner';
import {ErrorMessage} from '../../components/ErrorMessage';
import {fetchInitialUser} from '../../redux/tool/UserSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.hook';
import {fetchCompletedItems, fetchItems} from '../../redux/tool/ItemsSlice';
import {Logout} from '../../components/Logout';
import {useGetItemsQuery} from '../../api/apiSlice';

const Main = () => {
  const {items, completedItems} = useAppSelector((state) => state.items);
  const {id} = useAppSelector((state) => state.user.user);
  // const {
  //   data: itemsList,
  //   isFetching,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetItemsQuery("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id.length <= 0) {
      dispatch(fetchInitialUser());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InitialComponent>
      <PageLayout>
        <Today />
        {items.length > 0 || completedItems.items.length > 0 ? (
          <>
            <ListItems />
            <AddTask />
            <CompletedItems />
          </>
        ) : (
          <>
            <AddTask />
            <DefaultPage text="You don't have a task yet" />
          </>
        )}
      </PageLayout>
      <Logout />
    </InitialComponent>
  );
};

const InitialComponent = ({children}: IGeneralChildren) => {
  const {userLoading} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchItems());
    dispatch(fetchCompletedItems());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  switch (userLoading) {
    case 'loading':
      return <Spinner />;
    case 'error':
      return <ErrorMessage customErrorText="Something went wrong" />;
    case 'idle':
      return <div style={{position: 'relative'}}>{children}</div>;
    default:
      return null;
  }
};

export {Main};
