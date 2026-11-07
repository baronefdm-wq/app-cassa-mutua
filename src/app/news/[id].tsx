import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import HtmlView from '../../components/HtmlView';
import { ErrorBox, Loading } from '../../components/ui';
import { fetchPost, formatDate, type WpPost } from '../../lib/wp';

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export default function NewsDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<WpPost | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    fetchPost(Number(id))
      .then((p) => active && setPost(p))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [id, attempt]);

  const load = () => {
    setError(false);
    setAttempt((n) => n + 1);
  };

  if (error) return <ErrorBox onRetry={load} />;
  if (!post) return <Loading />;

  const html = `
    <article style="padding:20px 18px 0">
      <div style="font:600 12px Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#1E78C5">${formatDate(post.date)}</div>
      <h1 style="font:900 26px/1.15 Montserrat,sans-serif;color:#10243A;margin:8px 0 16px">${escape(post.title)}</h1>
      ${post.image ? `<img src="${post.image}" style="width:100%;border-radius:16px;margin-bottom:12px" alt="">` : ''}
      <div class="post-body" style="color:#2B3D52">${post.html}</div>
    </article>
    <style>.post-body p{margin:0 0 14px}.post-body h2,.post-body h3{color:#0B2440;margin:22px 0 10px}</style>`;

  return (
    <View style={{ flex: 1 }}>
      <HtmlView html={html} title={post.title} />
    </View>
  );
}
