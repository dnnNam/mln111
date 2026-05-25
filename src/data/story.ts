import type { Story } from "../types/story";
import teo from "../assets/teo.jpg"
import teo1 from "../assets/teo1.jpg"
import teo2 from "../assets/teo2.jpg"
import teo3 from "../assets/teo3.jpg"
import teo4 from "../assets/teo4.jpg"
import teo5 from "../assets/teo5.jpg"
import teo6 from "../assets/teo6.jpg"
import audio1 from "../audio/audio1.mp3"
import audio2 from "../audio/audio2.mp3"
import audio3 from "../audio/audio3.mp3"
import audio4 from "../audio/audio4.mp3"
import audio5 from "../audio/audio5.mp3"
import audio6 from "../audio/audio6.mp3"
import audio7 from "../audio/audio7.mp3"
const story: Story = {
  start: {
      background: teo,
      audio: audio1,
      text: `
            Livestream của bạn bất ngờ viral.

            20.000 người đang xem.
            Đơn hàng tăng liên tục.

            Nhân viên nhắn:
            "Anh ơi tụi em xử lý không kịp nữa..."
      `,

      choices: [
        {
          text: "Mở tuyển thêm người hỗ trợ",
          next: "hire",
        },
        {
          text: "Yêu cầu nhân viên làm thêm tới khuya",
          next: "overtime",
        },
      ],
  },

  hire: {
    background:
     teo1,
      audio: audio2,
    text: `
          Bạn tuyển thêm người hỗ trợ.

          Chi phí tăng nhưng công việc ổn định hơn.
          Nhân viên cảm thấy được chia sẻ áp lực.
    `,

    
  },

  overtime: {
    background:
      teo2,
      audio: audio3,

    text: `
Bạn yêu cầu nhân viên làm xuyên đêm.

Một nhân viên bí mật quay video cảnh làm việc lúc 3 giờ sáng.

Ngày hôm sau...
Video viral trên TikTok.
    `,

    choices: [
      {
        text: "Đăng bài xin lỗi",
        next: "sorry",
      },
      {
        text: "Livestream phản pháo",
        next: "fight",
      },
    ],
  },

  sorry: {
    background:
     teo3,
    audio: audio4,
    text: `
Bạn đăng bài xin lỗi công khai.

Drama dần hạ nhiệt.
Nhiều người bắt đầu thông cảm hơn.
    `,

    choices: [
      {
        text: "Xem kết thúc",
        next: "normalEnding",
      },
    ],
  },

  fight: {
    background:
     teo4,
    audio: audio5,
    text: `
Bạn livestream nói:
"Ai làm sale mà chẳng phải tăng ca?"
Clip bị cắt đăng khắp mạng xã hội.
Drama bùng nổ mạnh hơn.
Nhiều người kêu gọi tẩy chay shop.
=> Truyền thông và dư luận xã hội có thể chi phối hoạt động kinh tế.
Sau drama, cơ quan chức năng bắt đầu kiểm tra shop.
Thông báo:
"Kiểm tra thuế và điều kiện lao động."
    `,

    choices: [
       {
      text: "Hợp tác và cung cấp đầy đủ thông tin",
      next: "cooperate",
    },
    {
      text: "Chống đối / né tránh kiểm tra",
      next: "resist",
    },
    ],
  },

  cooperate: {
  background: teo5,
  audio: audio6,
  text: `
Bạn hợp tác với cơ quan chức năng.

Shop được hướng dẫn điều chỉnh và không bị xử lý nặng.
  `,
  choices: [
    {
      text: "Xem kết thúc",
      next: "normalEnding",
    },
  ],
},

resist: {
  background: teo6,
  audio: audio7,
  text: `
Bạn né tránh kiểm tra và không hợp tác.

Cơ quan chức năng xử lý mạnh tay.

Shop bị đình chỉ hoạt động.
  `,
  choices: [
    {
      text: "Tiếp tục",
      next: "badEnding",
    },
  ],
},

  goodEnding: {
    background:
      teo5,

    text: `
ENDING:
Shop phát triển ổn định.
    `,

    choices: [],
  },

  normalEnding: {
    background:
      teo1,

    text: `
ENDING:
Vượt qua khủng hoảng.
    `,

    choices: [],
  },

  badEnding: {
    background:
      teo6,

    text: `
ENDING:
Shop sụp đổ sau một đêm viral.
    `,

    choices: [],
  },
};

export default story;