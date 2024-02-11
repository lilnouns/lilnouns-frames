import { Cloudinary, Transformation } from '@cloudinary/url-gen'
import { source } from '@cloudinary/url-gen/actions/overlay'
import { fill, scale } from '@cloudinary/url-gen/actions/resize'
import { northEast, northWest } from '@cloudinary/url-gen/qualifiers/compass'
import { autoGravity, compass } from '@cloudinary/url-gen/qualifiers/gravity'
import { Position } from '@cloudinary/url-gen/qualifiers/position'
import { image, text } from '@cloudinary/url-gen/qualifiers/source'
import { TextFitQualifier, size } from '@cloudinary/url-gen/qualifiers/textFit'
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle'
import { Context } from 'hono'
import { Environment } from '../types'

export function getStartImage({ env }: Context<Environment>): string {
  const cld = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    },
  })

  return cld
    .image('blank')
    .format('webp')
    .resize(fill().width(800).height(418).gravity(autoGravity()))
    .overlay(
      source(
        text('Lil Nouns Subdomains', new TextStyle('Londrina Solid', 50))
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(60),
      ),
    )
    .overlay(
      source(
        image('lilnouns/ln_3322').transformation(
          new Transformation().resize(scale(120)),
        ),
      ).position(
        new Position().gravity(compass(northEast())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(
          'As a member of the Lil Nouns community and a Lil Noun owner, you have the chance to claim a subdomain under the "lilnouns.eth" domain for your Ethereum address. Don\'t miss out on this opportunity!' +
            '\n\n' +
            'By following this step, you can create a distinct identity for your Lil Noun and make a mark in the Lil Nouns community.',
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 340))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(150),
      ),
    )
    .backgroundColor('#E1D7D5')
    .toURL()
}
export function getCheckImage({ env }: Context<Environment>) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    },
  })

  return cld
    .image('blank')
    .format('webp')
    .resize(fill().width(800).height(418).gravity(autoGravity()))
    .overlay(
      source(
        text('Lil Nouns Subdomains', new TextStyle('Londrina Solid', 50))
          .textFit(new TextFitQualifier(550))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(60),
      ),
    )
    .overlay(
      source(
        image('lilnouns/ln_3322_wink').transformation(
          new Transformation().resize(scale(120)),
        ),
      ).position(
        new Position().gravity(compass(northEast())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(
          'It might be a good idea to check if the name you have in mind is available or if it has already been taken.' +
            '\n\n' +
            "Check the availability of your desired name by entering it and clicking the button. Don't wait too long or you may miss out on your preferred option.",
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 340))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(150),
      ),
    )
    .backgroundColor('#E1D7D5')
    .toURL()
}

export function getInvalidDomainImage(
  { env }: Context<Environment>,
  domain: string,
) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    },
  })

  return cld
    .image('blank')
    .format('webp')
    .resize(fill().width(800).height(418).gravity(autoGravity()))
    .overlay(
      source(
        text('Lil Nouns Subdomains', new TextStyle('Londrina Solid', 50))
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(60),
      ),
    )
    .overlay(
      source(
        image('lilnouns/ln_3322_sus').transformation(
          new Transformation().resize(scale(120)),
        ),
      ).position(
        new Position().gravity(compass(northEast())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(
          "Dude, that name doesn't look like a valid subdomain to me.",
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 340))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(domain, new TextStyle('PT Sans', 22))
          .textFit(size(550, 100))
          .textColor('red'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(220),
      ),
    )
    .overlay(
      source(
        text(
          "Could you please enter a valid domain? It shouldn't contain any spaces or unusual characters.",
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(260),
      ),
    )
    .backgroundColor('#E1D7D5')
    .toURL()
}
export function getAvailableDomainImage(
  { env }: Context<Environment>,
  domain: string,
): string {
  const cld = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    },
  })

  return cld
    .image('blank')
    .format('webp')
    .resize(fill().width(800).height(418).gravity(autoGravity()))
    .overlay(
      source(
        text('Lil Nouns Subdomains', new TextStyle('Londrina Solid', 50))
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(60),
      ),
    )
    .overlay(
      source(
        image('lilnouns/ln_3322_happy').transformation(
          new Transformation().resize(scale(120)),
        ),
      ).position(
        new Position().gravity(compass(northEast())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(
          'Congratulation, it seems like the domain you are were looking for is available to claim.',
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 340))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(domain, new TextStyle('PT Sans', 22))
          .textFit(size(550, 100))
          .textColor('green'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(220),
      ),
    )
    .overlay(
      source(
        text(
          'If you would like to claim your name under the “lilnouns.eth” domain, simply press the "Claim" button and you will be redirected to the appropriate page.',
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(260),
      ),
    )
    .backgroundColor('#E1D7D5')
    .toURL()
}

export function getUnavailableDomainImage(
  { env }: Context<Environment>,
  domain: string,
) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
    },
  })

  return cld
    .image('blank')
    .format('webp')
    .resize(fill().width(800).height(418).gravity(autoGravity()))
    .overlay(
      source(
        text('Lil Nouns Subdomains', new TextStyle('Londrina Solid', 50))
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(60),
      ),
    )
    .overlay(
      source(
        image('lilnouns/ln_3322_sad').transformation(
          new Transformation().resize(scale(120)),
        ),
      ).position(
        new Position().gravity(compass(northEast())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(
          "I'm sorry, but it seems that the domain you were searching for has already been claimed.",
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(150),
      ),
    )
    .overlay(
      source(
        text(domain, new TextStyle('PT Sans', 22))
          .textFit(size(550, 100))
          .textColor('red'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(220),
      ),
    )
    .overlay(
      source(
        text(
          'Feel free to try again with a different name. Once you\'ve entered a new name, simply click the "Check" button.',
          new TextStyle('PT Sans', 22),
        )
          .textFit(size(550, 100))
          .textColor('#1E3445'),
      ).position(
        new Position().gravity(compass(northWest())).offsetX(60).offsetY(260),
      ),
    )
    .backgroundColor('#E1D7D5')
    .toURL()
}
