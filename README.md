# HiQ assignment

A reddit-viewer made as an assigment for HiQ.
You can view the live version deployed [here](https://determined-beaver-40f9ca.netlify.app/)

## Running the application locally
Start with  installing the dependencies with
```
yarn
```

Then you can run
```
yarn start
```
To run test run: `yarn test` and to build the project you can run `yarn build` which will build in a `/build` folder.


### Features

- The list is presenting 10 posts
- You can go back and forth between pages
- The user can browse their favorite subreddit by entering it in the input
- A post contains : `thumbnail`, `created`, `num_comments`, `author`, `score`, `permalink` and `title`
- A button available if it's a selfpost, and it contains `selftext`
- A unit test on the `Post` component
- An integration test when pagination is tested and the change of subreddit


### Stack

Repo initiated with `create-react-app` with the typescript template in order to get started faster.

I used `styled-components` for all the styling except for the body styling which I prefer to handle in normal `.css` file.

The unit and the integration tests are written with `jest` and `testing-library`. 
The callbacks for the integration tests are mocked with the `msw` library.

### Future additions
Adding a `select` for the user to be able to choose the number of posts shown on the page could be added as another state (`postLimit`) within `PostList.tsx`
Then instead of having `POST_LIMIT` hardcoded in the url, you could just insert the new state `postLimit` instead.
It would be very similar to how the `subreddit` state is functioning.

Adding comments would also be feasible.
I would create a new component inside of `Post.tsx` that would fetch the comments on an expansion of the comment section or on a button click that would open a modal with the comments.



**Feel free to contact me and ask more questions**