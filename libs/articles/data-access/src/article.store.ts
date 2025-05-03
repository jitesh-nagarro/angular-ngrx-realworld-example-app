import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { ArticleState, articleInitialState } from './models/article.model';
import { inject } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { setLoaded, setLoading, withCallState } from '@realworld/core/data-access';
import { tapResponse } from '@ngrx/operators';
import { ActionsService } from './services/actions.service';
import { Router } from '@angular/router';
import { NewArticle } from '@realworld/core/api-types';
import { FormErrorsStore } from '@realworld/core/forms';

export const ArticleStore = signalStore(
  { providedIn: 'root' },
  withState<ArticleState>(articleInitialState),
  withMethods(
    (
      store,
      articlesService = inject(ArticlesService),
      actionsService = inject(ActionsService),
      router = inject(Router),
      formErrorsStore = inject(FormErrorsStore),
    ) => ({
      getArticle: rxMethod<string>(
        pipe(
          switchMap((slug) => {
            patchState(store, { data: articleInitialState.data, ...setLoading('getArticle') });
            return articlesService.getArticle(slug).pipe(
              tapResponse({
                next: ({ article }) => {
                  patchState(store, { data: article, ...setLoaded('getArticle') });
                },
                error: () => {
                  patchState(store, { data: articleInitialState.data, ...setLoaded('getArticle') });
                },
              }),
            );
          }),
        ),
      ),
      getComments: rxMethod<string>(
        pipe(
          switchMap((slug) => {
            patchState(store, { comments: articleInitialState.comments, ...setLoading('getComments') });
            return articlesService.getComments(slug).pipe(
              tapResponse({
                next: ({ comments }) => {
                  patchState(store, { comments: comments, ...setLoaded('getComments') });
                },
                error: () => {
                  patchState(store, { comments: articleInitialState.comments, ...setLoaded('getComments') });
                },
              }),
            );
          }),
        ),
      ),
      followUser: rxMethod<string>(
        pipe(
          switchMap((username) => actionsService.followUser(username)),
          tap(({ profile }) => patchState(store, { data: { ...store.data(), author: profile } })),
        ),
      ),
      unfollowUser: rxMethod<string>(
        pipe(
          switchMap((username) => actionsService.unfollowUser(username)),
          tap(({ profile }) => patchState(store, { data: { ...store.data(), author: profile } })),
        ),
      ),
      deleteComment: rxMethod<{ commentId: number; slug: string }>(
        pipe(
          switchMap(({ commentId, slug }) =>
            articlesService
              .deleteComment(commentId, slug)
              .pipe(
                tap(() => patchState(store, { comments: store.comments().filter((item) => item.id !== commentId) })),
              ),
          ),
        ),
      ),
      deleteArticle: rxMethod<string>(
        pipe(
          switchMap((slug) =>
            articlesService.deleteArticle(slug).pipe(
              tapResponse({
                next: () => router.navigate(['/']),
                error: () => patchState(store, articleInitialState),
              }),
            ),
          ),
        ),
      ),
      addComment: rxMethod<string>(
        pipe(
          switchMap((addedComment) =>
            articlesService.addComment(store.data.slug(), addedComment).pipe(
              tapResponse({
                next: ({ comment }) => patchState(store, { comments: [comment, ...store.comments()] }),
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
      publishArticle: rxMethod<NewArticle>(
        pipe(
          switchMap((article) =>
            articlesService.publishArticle(article).pipe(
              tapResponse({
                next: ({ article }) => router.navigate(['article', article.slug]),
                error: ({ error }) => formErrorsStore.setErrors({ errors: error.errors }),
              }),
            ),
          ),
        ),
      ),
      editArticle: rxMethod<any>(
        pipe(
          switchMap((article) =>
            articlesService.editArticle(article).pipe(
              tapResponse({
                next: ({ article }) => router.navigate(['article', article.slug]),
                error: ({ error }) => formErrorsStore.setErrors(error.errors),
              }),
            ),
          ),
        ),
      ),
      initializeArticle: () => {
        patchState(store, articleInitialState);
      },
    }),
  ),
  withCallState({ collection: 'getArticle' }),
  withCallState({ collection: 'getComments' }),
);
