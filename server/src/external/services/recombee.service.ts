import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiClient, requests } from 'recombee-api-client';
import { User } from 'src/auth/entities/user.entity';
import { AppConfig } from 'src/common/configs/app.config';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class RecombeeService {
  private client: ApiClient;
  constructor(private configService: ConfigService<AppConfig>) {
    this.client = new ApiClient(
      configService.get('recombee.dbId'),
      configService.get('recombee.privateToken'),
      { region: 'eu-west' },
    );
  }

  async createPost(post: Post) {
    try {
      const timeout = 999999;
      const addItemReq = new requests.AddItem(post.id.toString());
      const setItemValuesReq = new requests.SetItemValues(post.id.toString(), {
        address: post.address,
        area: post.area,
        category: post.category?.name,
        desc: post.desc,
        district: post.district?.name,
        gender: post.gender || [],
        ward: post.ward?.name,
        province: post.province?.name,
        image: post.postImages?.[0]?.image?.url,
        price: post.price,
        title: post.title,
      });
      addItemReq.timeout = timeout;
      setItemValuesReq.timeout = timeout;

      await this.client.send(addItemReq);
      await this.client.send(setItemValuesReq);
    } catch (error) {
      console.log('err when AddItem', error);
    }
  }

  likePost(userId: number, postId: number) {
    const req = new requests.AddBookmark(userId.toString(), postId.toString(), {
      cascadeCreate: true,
    });
    req.timeout = 999999;
    this.client
      .send(req)
      .catch((err) => console.log('err at AddBookmark', err));
  }

  dislikePost(userId: number, postId: number) {
    const req = new requests.DeleteBookmark(
      userId.toString(),
      postId.toString(),
    );
    req.timeout = 999999;
    this.client
      .send(req)
      .catch((err) => console.log('err at DeleteBookmark', err));
  }

  createUser(user: User) {
    const timeout = 999999;
    const addUserReq = new requests.AddUser(user.id.toString());

    const setUserValuesReq = new requests.SetUserValues(user.id.toString(), {
      avatar: user.avatar,
      email: user.email,
      facebook: user.facebook,
      name: user.name,
      phoneNumber: user.phoneNumber,
      zaloPhoneNumber: user.zaloPhoneNumber,
    });
    addUserReq.timeout = timeout;
    setUserValuesReq.timeout = timeout;

    this.client
      .send(addUserReq)
      .then(() => {
        return this.client.send(setUserValuesReq);
      })
      .catch((err) => console.log('err when AddUser', err));
  }

  async updateUser(user: User) {
    try {
      const timeout = 999999;

      const setUserValuesReq = new requests.SetUserValues(user.id.toString(), {
        avatar: user.avatar,
        email: user.email,
        facebook: user.facebook,
        name: user.name,
        phoneNumber: user.phoneNumber,
        zaloPhoneNumber: user.zaloPhoneNumber,
      });
      setUserValuesReq.timeout = timeout;

      await this.client.send(setUserValuesReq);
    } catch (error) {
      console.log('error', error);
    }
  }

  async getRecommendedPost(userId: number, amount: number) {
    const req = new requests.RecommendItemsToUser(userId.toString(), amount);
    req.timeout = 999999;
    const res = await this.client.send(req);
    return res;
  }
}
