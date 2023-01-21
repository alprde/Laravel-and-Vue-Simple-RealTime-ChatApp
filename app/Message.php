<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['text', 'user_id'];

    protected $touches = ['user'];

    protected $with = ['user'];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
