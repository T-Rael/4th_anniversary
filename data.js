/* ====================== DỮ LIỆU ẢNH, VIDEO VÀ NỘI DUNG ======================
  Ảnh: "images/ten-anh.jpg" | Video: link .mp4 hoặc YouTube /embed/
  Nhạc nền: "music/ten-bai-hat.mp3". Trang không tự phát nhạc.
=================================================================== */
const CONFIG = {
    music: 'music/Ánh Nắng Của Anh - Đức Phúc (Chờ Em Đến Ngày Mai OST) -- PIANO COVER -- AN COONG PIANO.mp3',
    letter: `Mình đã cũng nhau đi qua bốn năm, đã cùng nhau trải qua hàng nghìn khoảnh khắc, có vô số lần đầu tiên với nhau, những khoảnh khắc bồng bột, bùng cháy của tuổi trẻ, cũng có những lần trầm lặng căng thẳng. Và anh mong rằng chúng ta sẽ cùng nhau trải qua nhiều thứ hơn nữa, dù có chuyện gì thì anh cũng vẫn sẽ yêu em.

Cảm ơn em vì đã ở đây, cùng anh viết nên câu chuyện của chúng mình. Chúc em luôn xinh đẹp, thành công với những gì em theo đuổi và phát triển. Mong rằng cuốn sách này sẽ còn thật nhiều trang mới — và trang nào cũng có chúng ta.`,
    signature: 'Lộc dz',
    milestones: [
        {
            date: 'Love',
            title: 'Kỷ niệm kỷ yếu',
            desc: 'Những rung động tuổi 17, Khi mà chúng ta bắt đầu làm nhiều thứ cùng với nhau. Cảm ơn em đã đến bên anh và bắt đầu yêu anh. Đến giờ kỷ niệm này anh vẫn nhớ rất rõ.',
            photos: ['images/Ky_Yeu1.jpg', 'images/Ky_Yeu2.jpg', 'images/Ky_Yeu3.jpg'],
            videos: [],
        },

        {
            date: '14.02.2023',
            title: 'Valentine 2023',
            desc: 'Ngày Valentine đầu tiên của hai đứa, có lẽ đây sẽ là một trong những kỷ niệm mà anh nghĩ mình sẽ không thể quên hahaaa. Đi xem phim, ..., rồi xe hết điện. Và lời hứa thứ hai của anh dành cho em.',
            photos: ['images/Valentine2023_1.jpg', 'images/Valentine2023_2.jpg', 'images/Valentine2023_3.jpg'],
            videos: ['videos/Valentine2023.mp4'],
        },
        {
            date: '29.08.2023',
            title: 'Kỷ niệm một năm',
            desc: 'Năm đầu tiên bên nhau, anh nhớ lúc này 2 đứa đã lên Hà Nội nhập học được 1 2 tháng rồi. Hình như hôm đó mình đi ăn, chơi ở thung lũng hoa đến gần sáng mới về thì phải.',
            photos: [
                'images/Ky_Niem_Mot_Nam1.jpg',
                'images/Ky_Niem_Mot_Nam2.jpg',
                'images/Ky_Niem_Mot_Nam3.jpg',
                'images/Ky_Niem_Mot_Nam4.jpg',
                'images/Ky_Niem_Mot_Nam_4.jpg',
            ],
            videos: [],
        },
        {
            date: '25.12.2023',
            title: 'Giáng sinh thứ hai',
            desc: 'Một mùa Noel nữa, em có nhớ không, lúc ấy trời lạnh thật. Nhưng mà chụp được mấy quả ảnh xứng đáng.',
            photos: ['images/Giang_Sinh_Thu_Hai1.jpg', 'images/Giang_Sinh_Thu_Hai2.jpg', 'images/Giang_Sinh_Thu_Hai3.jpg'],
            videos: ['videos/Giang_Sinh_Thu_Hai.mp4'],
        },
        {
            date: '14.02.2024',
            title: 'Valentine 2024',
            desc: 'Hình như cứ đến valentine mình lại đi xem phim nhỉ, nhớ qua. Anh nhớ lúc ấy em bảo anh phải hứa gì cho giống năm đầu tiên ấy :))))',
            photos: [
                'images/Valentine2024_1.jpg',
                'images/Valentine2024_2.jpg',
                'images/Valentine2024_3.jpg',
                'images/Valentine2024_4.jpg',
                'images/Valentine2024_5.jpg',
                'images/Valentine2024_6.jpg',
                'images/Valentine2024_7.jpg',
            ],
            videos: ['videos/Valentine2024.mp4'],
        },
        {
            date: '29.08.2024',
            title: 'Kỷ niệm hai năm',
            desc: 'Hai năm cùng trưởng thành, cùng học cách lắng nghe và thương nhau nhiều hơn. Hôm ấy mình dành cả ngày với nhau, vì cả 2 đều biết em sắp đi xa và lần sau gặp lại sẽ tính bằng năm. Em còn nhớ không, đến tối mình lên Hải Dương ngồi ngắm sông nói chuyện ...',
            photos: [
                'images/Ky_Niem_2_Nam_1.jpg',
                'images/Ky_Niem_2_Nam_2.jpg',
                'images/Ky_Niem_2_Nam_3.jpg',
                'images/Ky_Niem_2_Nam_4.jpg',
                'images/Ky_Niem_2_Nam_5.jpg',
                'images/Ky_Niem_2_Nam_6.jpg',
                'images/Ky_Niem_2_Nam_7.jpg',
            ],
            videos: ['videos/Ky_Niem_2_Nam_1.mp4', 'videos/Ky_Niem_2_Nam_2.mp4'],
        },
        {
            date: '25.12.2024',
            title: 'Giáng sinh thứ ba',
            desc: 'Giảng sinh đầu tiên yêu xa ha. Ở Việt Nam thì giáng sinh không phổ biến như bên đó nên chủ yếu là ảnh của em thui.',
            photos: [
                'images/Giang_Sinh_Thu_Ba_1.jpg',
                'images/Giang_Sinh_Thu_Ba_2.jpg',
                'images/Giang_Sinh_Thu_Ba_3.jpg',
                'images/Giang_Sinh_Thu_Ba_4.jpg',
            ],
            videos: ['videos/Giang_Sinh_Thu_Ba_1.mp4', 'videos/Giang_Sinh_Thu_Ba_2.mp4'],
        },
        {
            date: '14.02.2025',
            title: 'Valentine 2025',
            desc: 'Anh vẫn còn nhớ socola của em, mỗi cái socola anh đều quay video múc bang hahaha. Hôm trước anh mới xem lại thấy thèm thật.',
            photos: ['images/Valentine2025_1.jpg', 'images/Valentine2025_2.jpg', 'images/Valentine2025_3.jpg'],
            videos: [],
        },
        {
            date: '29.08.2025',
            title: 'Kỷ niệm ba năm',
            desc: 'Anniversary đầu tiên xa nhau, nếu anh nhớ không nhầm thì thời điểm này cả 2 đứa đang rất bận với những công việc, câu chuyện của mình. Nhưng cuối ngày vẫn có thời gian dành cho nhau.',
            photos: ['images/Ky_Niem_Ba_Nam_1.jpg', 'images/Ky_Niem_Ba_Nam_2.jpg', 'images/Ky_Niem_Ba_Nam_3.jpg'],
            videos: [],
        },
        {
            date: '14.02.2026',
            title: 'Valentine 2026',
            desc: 'Valentine năm thứ tư, anh nhớ là khoảng thời gian nào ấy em xem Lý Tuân xong thích như này lắm nên có ý tưởng làm cái này cho em. Trời ơi quả tóc kết hợp với cái mắt tím vì mới đá giải xong :))))',
            photos: [
                'images/Valentine2026_1.jpg',
                'images/Valentine2026_2.jpg',
                'images/Valentine2026_3.jpg',
                'images/Valentine2026_4.jpg',
                'images/Valentine2026_5.jpg',
                'images/Valentine2026_6.jpg',
            ],
            videos: [],
        },
        {
            date: '29.08.2026',
            title: 'Kỷ niệm bốn năm',
            desc: 'Chặng đường bốn năm khép lại một chương, nhưng anh mong rằng câu chuyện của chúng mình vẫn còn rất nhiều trang để viết tiếp.',
            photos: [],
            videos: [],
        },
    ],
    playlist: [
        // Bấm vào bài hát sẽ phát trực tiếp file MP3 trong thư mục music.
        {
            title: 'Có Em',
            artist: 'Madihu ft. Low G',
            note: 'vì bình yên nhất là khi có em',
            src: 'music/Madihu - Có em (Feat. Low G) [Official MV].mp3',
        },
        {
            title: 'Nàng Thơ',
            artist: 'Hoàng Dũng',
            note: 'dành cho nàng thơ của anh',
            src: 'music/Nàng Thơ - Hoàng Dũng - Official MV.mp3',
        },
        {
            title: 'Một Nhà',
            artist: 'Da LAB',
            note: 'khi hai ta về một nhà',
            src: 'music/Da LAB - Một Nhà (Official Lyric Video).mp3',
        },
        {
            title: 'Có Chàng Trai Viết Lên Cây',
            artist: 'Phan Mạnh Quỳnh',
            note: 'một câu chuyện dịu dàng của tuổi trẻ',
            src: 'music/Có Chàng Trai Viết Lên Cây - Phan Mạnh Quỳnh - MẮT BIẾC OST.mp3',
        },
        {
            title: 'Anh Lộc đẹp trai',
            artist: 'Trần Gia Lộc',
            note: 'Sáng tác bởi cô độc vương',
            src: 'music/ĐẾN KHI NÀO (Hot Trend)...Mặt Trời Ngừng Chiếu - Những Bản Hits Nhạc Trẻ Chill Triệu View.mp3',
        },
        {
            title: 'Remix Drill',
            artist: 'Anh Trần Gia Lộc',
            note: 'Sáng tác bởi cô độc vương',
            src: 'music/[PLAYLIST NHẠC DRILL] Top Những Bản Nhạc Drill Cực Peak - Ngày Mình Chia Tay, Thành Đô....mp3',
        },
    ],
};
