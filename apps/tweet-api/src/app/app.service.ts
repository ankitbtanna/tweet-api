import { TwitterApi } from 'twitter-api-v2';

import { Injectable } from '@nestjs/common';
import { catchError, concatMap, delay, from, map, of, toArray } from 'rxjs';
import { TWEETS } from './tweets.const';

@Injectable()
export class AppService {
  private twitterClient = new TwitterApi({
    appKey: '9VYinGOTBv1IFDSP2buD98QjR',
    appSecret: 'hZ2ghkOnGfvzA4TYZqAjXLlRLAOn5pBRbgvWAYbNviYDYUIyOP',
    accessToken: '138187653-DLfsYdtkfbbOAamyKvVXmRbWP5NeFC5HtNwi4j8R',
    accessSecret: '33lUc4vK7DGSUfrjR2R09Di2QuE9pIPeVQZgH3y4ZguFS',
  });

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  tweetAllArticles(tweets: { tags: string; tweet: string }[] = TWEETS) {
    return from(tweets).pipe(
      concatMap((tweet) =>
        this.tweet(`${tweet.tweet} ${tweet.tags}`).pipe(delay(2000))
      ),
      toArray()
    );
  }

  tweet(tweet: string) {
    return from(this.twitterClient.v2.tweet(tweet)).pipe(
      map((tweet) => {
        console.log(`Tweeted:`, tweet);
        return tweet.data;
      }),
      catchError((error) => {
        console.log(error.data);
        return of(error.data.status);
      })
    );
  }
}
