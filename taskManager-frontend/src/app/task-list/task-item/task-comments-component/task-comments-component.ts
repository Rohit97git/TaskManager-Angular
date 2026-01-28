import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentModel } from '../../../models/comment.model';
import { CommentServices } from '../../../services/comment-services';

@Component({
  selector: 'app-task-comments-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-comments-component.html',
  styleUrl: './task-comments-component.css',
})
export class TaskCommentsComponent implements OnInit {
  @Input() taskId!: number;

  comments: CommentModel[] = [];
  newComment = '';
  error = '';

  constructor(private commentService: CommentServices) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments(this.taskId).subscribe({
      next: (res) => (this.comments = res),
      error: (err) => (this.error = err),
    });
  }

  addComments(): void {
    if (!this.newComment.trim()) return;

    const comment: CommentModel = {
      taskId: this.taskId,
      text: this.newComment,
      createdAt: new Date().toISOString(),
    };

    this.commentService.addComment(comment).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments();
      },

      error: (err) => (this.error = err),
    });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: () => this.loadComments(),
      error: (err) => (this.error = err),
    });
  }
}
