import banner1 from "../assets/stitchandfit/blouse9.jpg";
import banner2 from "../assets/stitchandfit/blouse12.jpg";
import banner3 from "../assets/stitchandfit/blouse20.jpg";

export default function ProductDescriptionHeader() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First row */}
        <div className="flex justify-center">
          <img
            src={banner1}
            alt="Traditional clothing"
            width={400}
            height={600}
            className="rounded-md object-cover"
          />
        </div>

        <div className="flex items-center">
          <p className="text-gray-700 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur. Ornare ut maecenas dui
            adipisci vel et. Ut nunc mattis magna purus diam nunc tortor.
            Pharetra vitae et sociis tempus praesent vehicula. Pretium
            consectetur vitae dictum pellentesque vel mauris velit. Dictum nunc
            tempor cursus libero pellentesque. Sapien commodo habitare magna
            pellentesque vel ultricies cursus. Ultricies vitae vitae sed mattis
            duis duis vestibulum lorem. Ipsum sit sit pellentesque morbi. Eget
            vestibulum lorem diam sit sit pellentesque. Morbi morbi et mi massa
            ipsum. Suspendisse tortor ultricies. Orci vestibulum tempus commodo
            id. Velit vulputate commodo lorem amet et in. Lorem dolor fringilla
            faucilisis consectetur aliqua bibendum non. Nulla quam molestie
            velit suspendisse et magna leo. Nisi cursus aliquet et tristique
            vehicula netus duis.
          </p>
        </div>

        {/* Second row */}
        <div className="flex items-center md:order-3">
          <p className="text-gray-700 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur. Ornare ut maecenas dui
            adipisci vel et. Ut nunc mattis magna purus diam nunc tortor.
            Pharetra vitae et sociis tempus praesent vehicula. Pretium
            consectetur vitae dictum pellentesque vel mauris velit. Dictum nunc
            tempor cursus libero pellentesque. Sapien commodo habitare magna
            pellentesque vel ultricies cursus. Ultricies vitae vitae sed mattis
            duis duis vestibulum lorem. Ipsum sit sit pellentesque morbi. Eget
            vestibulum lorem diam sit sit pellentesque. Morbi morbi et mi massa
            ipsum. Suspendisse tortor ultricies. Orci vestibulum tempus commodo
            id. Velit vulputate commodo lorem amet et in. Lorem dolor fringilla
            faucilisis consectetur aliqua bibendum non.
          </p>
        </div>

        <div className="flex justify-center md:order-4">
          <img
            src={banner2}
            alt="Traditional jewelry"
            width={400}
            height={400}
            className="rounded-md object-cover w-[400px] h-[400px]"
          />
        </div>

        {/* Third row */}
        <div className="flex justify-center md:order-5">
          <img
            src={banner3}
            alt="Traditional clothing detail"
            width={400}
            height={600}
            className="rounded-md object-cover"
          />
        </div>

        <div className="flex items-center md:order-6">
          <p className="text-gray-700 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet consectetur. Ornare ut maecenas dui
            adipisci vel et. Ut nunc mattis magna purus diam nunc tortor.
            Pharetra vitae et sociis tempus praesent vehicula. Pretium
            consectetur vitae dictum pellentesque vel mauris velit. Dictum nunc
            tempor cursus libero pellentesque. Sapien commodo habitare magna
            pellentesque vel ultricies cursus. Ultricies vitae vitae sed mattis
            duis duis vestibulum lorem. Ipsum sit sit pellentesque morbi. Eget
            vestibulum lorem diam sit sit pellentesque. Morbi morbi et mi massa
            ipsum. Suspendisse tortor ultricies. Orci vestibulum tempus commodo
            id. Velit vulputate commodo lorem amet et in. Lorem dolor fringilla
            faucilisis consectetur aliqua bibendum non. Nulla quam molestie
            velit suspendisse et magna leo.
          </p>
        </div>
      </div>
    </div>
  );
}
